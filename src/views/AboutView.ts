import { attachURL } from '@/utils/file-id-to-url';
import ChainedSelectSource from '@/components/ChainedSelectSource';
import InputFileReceiver from '@/components/InputFileReceiver';

export default {
  type: 'page',
  title: '会员管理',
  toolbar: [
    {
      type: 'button',
      label: '新增',
      icon: 'fa fa-plus',
      level: 'primary',
      actionType: 'dialog',
      dialog: {
        title: '新增记录',
        body: {
          type: 'form',
          api: {
            method: 'post',
            url: '${DIRECTUS_URL}/items/app02_product',
            data: {
              category: '${COMPACT(category)|last}',
              name: '${name}',
              current_price: '${current_price}',
              image: '${__image|default:null}',
            },
          },
          rules: [
            {
              rule: '${category != ""}',
              message: '不能为空',
              name: 'category',
            },
          ],
          body: [
            {
              type: 'chained-select',
              name: 'category',
              label: '品类',
              clearable: true,
              joinValues: false,
              extractValue: true,
              required: true,
              source: ChainedSelectSource({ collection: 'app02_category' }),
            },
            {
              type: 'input-text',
              name: 'name',
              label: '名称',
              required: true,
            },
            {
              type: 'input-number',
              name: 'current_price',
              label: '当前价格',
              precision: 2,
              required: true,
            },
            {
              type: 'input-image',
              name: 'imageURL',
              label: '图片上传',
              receiver: InputFileReceiver(),
              autoFill: {
                __image: '${__fileId}',
              },
            },
          ],
        },
      },
    },
  ],
  body: {
    type: 'crud',
    syncLocation: false, // 重要!! 否则对部署在子目录下的vue应用有影响!
    api: {
      method: 'get',
      url: '${DIRECTUS_URL}/items/app02_product',
      data: {
        fields: ['id', 'name', 'current_price', 'status', 'image', 'category.name', 'category.id'],
        filter: {
          status: {
            _neq: 'archived',
          },
          name: {
            _icontains: '${filter_name|default:undefined}',
          },
          current_price: {
            _gte: '${filter_price|default:undefined}',
          },
        },
        sort: ['-date_created'],
        page: '${page}',
        limit: '${perPage}',
        meta: 'filter_count',
      },
    },
    filter: {
      wrapWithPanel: false,
      body: [
        {
          type: 'input-text',
          name: 'filter_name',
          label: '名称',
        },
        {
          type: 'input-number',
          name: 'filter_price',
          label: '价格 >=',
        },
        {
          type: 'submit',
          level: 'primary',
          label: '查询',
        },
        {
          type: 'reset',
          label: '重置',
        },
      ],
    },
    columns: [
      {
        name: 'category.name',
        label: '品类',
      },
      {
        name: '${image|fileIdToURL}',
        label: '图片',
        type: 'image',
      },
      {
        name: 'id',
        label: 'ID',
      },
      {
        name: 'name',
        label: '名称',
      },
      {
        name: 'current_price',
        label: '当前价格',
        type: 'number',
        affix: ' 元',
      },
      {
        name: 'status',
        label: '状态',
      },
      {
        type: 'operation',
        label: '操作',
        buttons: [
          {
            label: '详情',
            type: 'button',
            level: 'link',
            actionType: 'dialog',
            dialog: {
              title: '编辑详情',
              body: {
                type: 'form',
                initApi: {
                  method: 'get',
                  url: '${DIRECTUS_URL}/items/app02_product/${id}',
                  data: {
                    fields: [
                      'id',
                      'name',
                      'current_price',
                      'status',
                      'image',
                      'category.name',
                      'category.id',
                      'category.parent.id',
                      'category.parent.parent.id',
                    ],
                  },
                  adaptor: (payload: any) => {
                    attachURL(payload.data, ['image']);
                    // 把 category 处理成 [id1, id2, id3] 的形式
                    const { category } = payload.data;
                    const array = [category.id];
                    if (category.parent?.id) {
                      array.unshift(category.parent.id);
                    }
                    if (category.parent?.parent?.id) {
                      array.unshift(category.parent.parent.id);
                    }
                    payload.data.category = array;
                    return payload;
                  },
                },
                api: {
                  method: 'patch',
                  url: '${DIRECTUS_URL}/items/app02_product/${id}',
                  data: {
                    category: '${COMPACT(category)|last}',
                    name: '${name}',
                    current_price: '${current_price}',
                    image: '${__image|default:${image}}',
                    status: '${status}',
                  },
                },
                rules: [
                  {
                    rule: '${category != ""}',
                    message: '不能为空',
                    name: 'category',
                  },
                ],
                body: [
                  {
                    type: 'input-text',
                    name: 'id',
                    label: 'ID',
                    static: true,
                  },
                  {
                    type: 'chained-select',
                    name: 'category',
                    label: '品类',
                    clearable: true,
                    joinValues: false,
                    extractValue: true,
                    required: true,
                    source: ChainedSelectSource({ collection: 'app02_category' }),
                  },
                  {
                    type: 'input-text',
                    name: 'name',
                    label: '名称',
                    required: true,
                  },
                  {
                    type: 'input-number',
                    name: 'current_price',
                    label: '当前价格',
                    precision: 2,
                    required: true,
                  },
                  {
                    type: 'input-image',
                    name: 'imageURL',
                    label: '图片上传',
                    receiver: InputFileReceiver(),
                    autoFill: {
                      __image: '${__fileId}',
                    },
                  },
                  {
                    type: 'select',
                    name: 'status',
                    label: '状态',
                    options: ['published', 'draft'],
                    required: true,
                  },
                ],
              },
              actions: [
                {
                  type: 'button',
                  label: '取消',
                  actionType: 'cancel',
                },
                {
                  type: 'button',
                  label: '提交',
                  actionType: 'submit',
                  level: 'primary',
                },
              ],
            },
          },
          {
            label: '删除',
            type: 'button',
            level: 'link',
            className: 'text-danger',
            confirmText: '确认要删除吗？',
            actionType: 'ajax',
            api: {
              method: 'patch',
              url: '${DIRECTUS_URL}/items/app02_product/${id}',
              data: {
                status: 'archived',
              },
            },
          },
        ],
      },
    ],
    headerToolbar: ['bulkActions', 'statistics', 'pagination'],
    footerToolbar: ['switch-per-page'],
  },
};
