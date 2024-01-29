import { fileIdToURL } from '@/utils/file-id-to-url';

export default function InputFileReceiver() {
  return {
    method: 'post',
    url: '${DIRECTUS_URL}/files',
    adaptor: (payload: any) => {
      return {
        data: {
          __fileId: payload.data.id,
          value: fileIdToURL(payload.data.id, payload.data.ACCESS_TOKEN),
        },
      };
    },
  };
}
