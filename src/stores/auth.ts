import { ref, computed, shallowRef, watch } from 'vue';
import { defineStore } from 'pinia';
import qs from 'qs';
import { DIRECTUS_URL, LOCAL_STORAGE_PREFIX } from '@/constants';
import { fileIdToURL } from '@/utils/file-id-to-url';

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
export const useAuthStore = defineStore('authStore', () => {
  const accessToken = ref('');
  /** UTC milliseconds when the access token expires */
  const expiresAt = ref(0);
  const refreshToken = ref('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const expiresDate = computed(() => {
    if (expiresAt.value === 0) {
      return 'Uninitialized';
    } else {
      return new Date(expiresAt.value).toLocaleString();
    }
  });
  const userData = shallowRef<any>({});
  const userAvatar = computed(() => {
    return fileIdToURL(userData.value.avatar, accessToken.value);
  });
  const userName = computed(() => {
    return userData.value.first_name + userData.value.last_name;
  });
  const isLoggedIn = computed(() => !!accessToken.value);
  let refreshPromise: Promise<boolean> | null = null;

  watch(accessToken, async (accessToken) => {
    if (expiresAt.value > Date.now()) {
      userData.value = await readUserData(accessToken);
    }
  });

  return {
    accessToken,
    isLoggedIn,
    userAvatar,
    userName,
    hydrate,
    dehydrate,
    refreshTokenIfExpired,
  };

  async function hydrate(options?: HydrateOptions) {
    if (!options) {
      await refreshTokenIfExpired();
    } else {
      const { authResponse } = options;
      stateSet(authResponse);
      storageSave();
    }
  }

  function dehydrate() {
    logout();
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

  /**
   * Refresh token if it is expired, otherwise do nothing.
   * @returns true if the token is refreshed.
   */
  async function refreshTokenIfExpired(): Promise<boolean> {
    if (!storageLoad()) {
      return false;
    }

    if (expiresAt.value < Date.now() + 30000) {
      if (refreshPromise) {
        return await activeRefresh();
      }

      refresh();
      return await activeRefresh();
    }

    return false;
  }

  /** Wait for the in progress token refresh processing finished  */
  async function activeRefresh(): Promise<boolean> {
    if (!refreshPromise) {
      throw new Error('no refresh in progress');
    }

    try {
      return await refreshPromise;
    } finally {
      refreshPromise = null;
    }
  }

  /** Start a token refresh processing */
  function refresh() {
    const awaitRefresh = async () => {
      const result = await _refresh();
      if (result) {
        stateSet(result);
        storageSave();
        return true;
      } else {
        console.error(`token refresh failure`);
        stateClear();
        storageClear();
        return false;
      }
    };

    refreshPromise = awaitRefresh();
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

  /** logout, destroying the user's session. */
  function logout() {
    const headers = {
      'Content-Type': 'application/json',
    };
    const url = DIRECTUS_URL + '/auth/logout';
    const data = {
      refresh_token: refreshToken.value,
    };
    fetch(url, {
      body: JSON.stringify(data),
      headers,
      method: 'POST',
    });
  }

  /** fetch the users data, if login was successful */
  async function readUserData(accessToken: string) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    };
    const query = {
      fields: ['email', 'first_name', 'last_name', 'avatar', 'role.name'],
    };
    const url = DIRECTUS_URL + '/users/me?' + qs.stringify(query);
    const res = await fetch(url, { headers, method: 'GET' });
    if (res.status < 200 || res.status > 299) {
      return null;
    }
    const json = await res.json();
    return json.data;
  }
});
