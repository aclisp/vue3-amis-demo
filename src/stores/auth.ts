import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { LOCAL_STORAGE_PREFIX } from '@/constants';

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

	return {
		accessToken,
		expiresAt,
		refreshToken,
		expiresDate,
		hydrate,
		dehydrate,
	};

	function hydrate(options?: HydrateOptions) {
		const key = authStorageKey();
		if (!options) {
			// load from storage
			const item = localStorage.getItem(key);
			if (item) {
				const object = JSON.parse(item);
				accessToken.value = object.accessToken;
				refreshToken.value = object.refreshToken;
				expiresAt.value = object.expiresAt;
			}
			return;
		}

		const { authResponse } = options;
		accessToken.value = authResponse.access_token;
		refreshToken.value = authResponse.refresh_token;
		expiresAt.value = Date.now() + authResponse.expires;
		const item = JSON.stringify({
			accessToken: accessToken.value,
			refreshToken: refreshToken.value,
			expiresAt: expiresAt.value,
		});
		localStorage.setItem(key, item);
	}

	function dehydrate() {
		accessToken.value = '';
		refreshToken.value = '';
		expiresAt.value = 0;
		const key = authStorageKey();
		localStorage.removeItem(key);
	}
});
