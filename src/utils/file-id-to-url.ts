import { DIRECTUS_URL } from '@/constants';

export function fileIdToURL(fileId: string, accessToken: string) {
  if (fileId) {
    return `${DIRECTUS_URL}/assets/${fileId}?access_token=${accessToken}`;
  } else {
    return '';
  }
}

/**
 * 用在 api.adaptor 里，给 data 加上 fileURL.
 * @param data 当前请求的响应 payload 里的 data
 * @param fields Directus 里 file 类型的字段名
 */
export function attachURL(data: any, fields: string[]) {
  const processItem = (item: any) => {
    for (const field of fields) {
      item[field + 'URL'] = fileIdToURL(item[field], data.ACCESS_TOKEN);
    }
  };
  if ('items' in data) {
    data.items.map(processItem);
  } else {
    processItem(data);
  }
}
