import { DIRECTUS_URL } from '@/constants';

export function fileIdToURL(fileId: string, accessToken: string) {
	if (fileId) {
		return `${DIRECTUS_URL}/assets/${fileId}?access_token=${accessToken}`;
	} else {
		return '';
	}
}
