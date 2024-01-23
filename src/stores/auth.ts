import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { DIRECTUS_URL, LOCAL_STORAGE_PREFIX } from '@/constants';

type AuthResponse = {
	access_token: string;
	expires: number;
	refresh_token: string;
};

type HydrateOptions = {
	authResponse: AuthResponse;
};

function authStorageKey() {
	return LOCAL_STORAGE_PREFIX + '_auth';
}

/**
 * 管理 Directus Login 接口返回的用户身份数据
 */
export const useAuthStore = defineStore('auth', () => {
	const accessToken = ref('');
	/** UTC milliseconds when the access token expires */
	const expiresAt = ref(0);
	const refreshToken = ref('');
	const expiresDate = computed(() => {
		if (expiresAt.value === 0) {
			return 'Uninitialized';
		} else {
			return new Date(expiresAt.value).toLocaleString();
		}
	});
	const isLoginUser = computed(() => !!accessToken.value);
	let refreshInProgress: Promise<void> | undefined = undefined;

	return {
		accessToken,
		isLoginUser,
		hydrate,
		dehydrate,
		updateToken,
	};

	async function hydrate(options?: HydrateOptions) {
		if (!options) {
			await updateToken();
			return;
		}

		const { authResponse } = options;
		stateSet(authResponse);
		storageSave();
	}

	function dehydrate() {
		stateClear();
		storageClear();
	}

	/** Set state by auth response */
	function stateSet(authResponse: AuthResponse) {
		accessToken.value = authResponse.access_token;
		refreshToken.value = authResponse.refresh_token;
		expiresAt.value = Date.now() + authResponse.expires;
	}

	/** Clear the state */
	function stateClear() {
		accessToken.value = '';
		refreshToken.value = '';
		expiresAt.value = 0;
	}

	/** Load state from storage, returns true if success */
	function storageLoad(): boolean {
		const key = authStorageKey();
		const item = localStorage.getItem(key);
		if (!item) {
			return false;
		}
		const object = JSON.parse(item);
		accessToken.value = object.accessToken;
		refreshToken.value = object.refreshToken;
		expiresAt.value = object.expiresAt;
		return true;
	}

	/** Save state to storage */
	function storageSave() {
		const key = authStorageKey();
		const item = JSON.stringify({
			accessToken: accessToken.value,
			refreshToken: refreshToken.value,
			expiresAt: expiresAt.value,
		});
		localStorage.setItem(key, item);
	}

	/** Clear the storage */
	function storageClear() {
		const key = authStorageKey();
		localStorage.removeItem(key);
	}

	/** Update token if it is expired, otherwise do nothing */
	async function updateToken() {
		if (!storageLoad()) {
			return;
		}

		if (expiresAt.value < Date.now() + 30000) {
			if (refreshInProgress) {
				return await waitForRefresh();
			}

			refresh();
			return await waitForRefresh();
		}
	}

	/** Wait for the in progress token refresh processing finished  */
	async function waitForRefresh() {
		if (!refreshInProgress) {
			throw new Error('no refresh in progress');
		}

		try {
			return await refreshInProgress;
		} finally {
			refreshInProgress = undefined;
		}
	}

	/** Start a token refresh processing */
	function refresh() {
		const refreshPromise = async () => {
			const result = await _refresh();
			if (result) {
				stateSet(result);
				storageSave();
				console.debug(`SAVE token until ${expiresDate.value}`);
			} else {
				console.error(`token refresh failure`);
			}
		};

		refreshInProgress = refreshPromise();
	}

	/** The actual token refresh handling, we use fetch */
	async function _refresh(): Promise<AuthResponse | null> {
		const headers = {
			'Content-Type': 'application/json',
		};
		const url = DIRECTUS_URL + '/auth/refresh';
		const data = {
			refresh_token: refreshToken.value,
			mode: 'json',
		};
		const res = await fetch(url, {
			body: JSON.stringify(data),
			headers,
			method: 'POST',
		});
		if (res.status < 200 || res.status > 299) {
			return null;
		}
		const json = await res.json();
		return json.data;
	}
});
