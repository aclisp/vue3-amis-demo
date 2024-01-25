import { attachURL } from '@/utils/file-id-to-url';

export default {
	type: 'page',
	title: '会员管理',
	body: {
		type: 'crud',
		api: {
			method: 'get',
			url: '${DIRECTUS_URL}/items/app02_product',
			data: {
				fields: ['id', 'name', 'current_price', 'status', 'image', 'category.name', 'category.id'],
				page: '${page}',
				limit: '${perPage}',
				meta: 'filter_count',
			},
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
										fields: ['id', 'name', 'current_price', 'status', 'image', 'category.name', 'category.id'],
									},
									adaptor: (payload: any) => {
										attachURL(payload.data, ['image']);
										return payload;
									},
								},
								api: {
									method: 'patch',
									url: '${DIRECTUS_URL}/items/app02_product/${id}',
								},
								body: [
									{
										type: 'input-text',
										name: 'id',
										label: 'ID',
										static: true,
									},
									{
										type: 'input-text',
										name: 'category.name',
										label: '品类',
										static: true,
									},
									{
										type: 'input-text',
										name: 'name',
										label: '名称',
									},
									{
										type: 'input-number',
										name: 'current_price',
										label: '当前价格',
										precision: 2,
									},
									{
										type: 'input-image',
										name: 'imageURL',
										label: '图片上传',
									},
									{
										type: 'select',
										name: 'status',
										label: '状态',
										options: ['published', 'draft', 'archived'],
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
					},
				],
			},
		],
		footerToolbar: ['statistics', 'pagination', 'switch-per-page'],
	},
};
