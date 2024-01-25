import { fileIdToURL } from '@/utils/file-id-to-url';

export default {
	type: 'page',
	title: '会员管理',
	body: {
		type: 'crud',
		api: {
			method: 'get',
			url: '${DIRECTUS_URL}/items/app02_product',
			data: {
				fields: ['id', 'name', 'current_price', 'status', 'image', 'category.name'],
				page: '${page}',
				limit: '${perPage}',
				meta: 'filter_count',
			},
			adaptor: (payload: any) => {
				const toURL = (fileId: string) => fileIdToURL(fileId, payload.data.ACCESS_TOKEN);
				payload.data.items.map((item: any) => {
					item.image = toURL(item.image);
				});
				return payload;
			},
		},
		columns: [
			{
				name: 'category.name',
				label: '品类',
			},
			{
				name: 'image',
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
							title: '查看详情',
							body: {
								type: 'form',
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
									},
									{
										type: 'input-image',
										label: '图片上传',
										name: 'image',
									},
									{
										type: 'select',
										name: 'status',
										label: '状态',
										options: ['published', 'draft', 'archived'],
									},
								],
							},
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
