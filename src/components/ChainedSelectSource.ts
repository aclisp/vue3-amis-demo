import { DIRECTUS_URL } from '@/constants';

export type ChainedSelectSourceOptions = {
  collection: string;
};

export default function ChainedSelectSource({ collection }: ChainedSelectSourceOptions) {
  return {
    method: 'get',
    url: `${DIRECTUS_URL}/items/${collection}`,
    data: {
      fields: ['id', 'name'],
      __parent: '${parentId}',
    },
    requestAdaptor: (api: any) => {
      const { __parent } = api.query;
      if (__parent) {
        api.data = { filter: { parent: { _eq: __parent } } };
      } else {
        api.data = { filter: { parent: { _null: true } } };
      }
    },
    adaptor: (payload: any) => {
      return {
        data: {
          items: payload.data.items.map((x: any) => ({ label: x.name, value: x.id })),
        },
      };
    },
  };
}
