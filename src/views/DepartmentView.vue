<script setup lang="ts">
import { treeMap } from '@liuli-util/tree';

type TreeItem = {
  id: string;
  name: string;
  children: TreeItem[];
};

const schema = {
  type: 'page',
  title: '部门与成员',
  body: {
    type: 'grid',
    columns: [
      {
        columnClassName: 'max-w-xs',
        type: 'input-tree',
        name: 'department',
        iconField: 'icon',
        source: {
          method: 'get',
          url: '${DIRECTUS_URL}/items/app01_department',
          data: {
            fields: ['id', 'name', 'children.id', 'children.name', 'children.children.id', 'children.children.name'],
            filter: { parent: { _null: true } },
          },
          adaptor: (payload: any) => {
            return {
              data: {
                items: treeMap(
                  payload.data.items as TreeItem[],
                  (it) => {
                    return {
                      label: it.name,
                      value: it.id,
                      icon: 'fa fa-folder-o',
                      children: it.children,
                    };
                  },
                  {
                    id: 'id',
                    children: 'children',
                  },
                ),
              },
            };
          },
        },
        onEvent: {
          change: {
            actions: [
              {
                actionType: 'reload',
                componentId: 'department-users',
                data: {
                  __departmentId: '${value}',
                },
              },
            ],
          },
        },
      },
      {
        type: 'crud',
        id: 'department-users',
        syncLocation: false,
        api: {
          method: 'get',
          url: '${DIRECTUS_URL}/items/app01_user_app01_department',
          data: {
            fields: ['app01_user_id.directus_user.*', 'app01_department_id.name'],
            filter: { app01_department_id: { _eq: '${__departmentId|default:undefined}' } },
            sort: ['app01_user_id.directus_user.first_name', 'app01_user_id.directus_user.last_name'],
            page: '${page}',
            limit: '${perPage}',
            meta: 'filter_count',
          },
          adaptor: (payload: any) => {
            const items = payload.data.items.map((x: any) => {
              return {
                ...x.app01_user_id.directus_user,
                department_name: x.app01_department_id.name,
              };
            });
            const total = payload.data.total;
            return { data: { items, total } };
          },
        },
        columns: [
          {
            name: 'first_name',
            label: '姓',
          },
          {
            name: 'last_name',
            label: '名',
          },
          {
            name: 'email',
            label: 'Email',
          },
          {
            name: 'status',
            label: '状态',
          },
          {
            name: 'department_name',
            label: '所在部门',
          },
        ],
      },
    ],
  },
};
</script>

<template>
  <AMISRenderer :schema="schema" />
</template>
