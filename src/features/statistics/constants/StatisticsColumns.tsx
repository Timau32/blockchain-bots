import { Typography } from 'antd';
const { Text } = Typography;

export const STATISTICS_COLUMNS = [
	{
		title: 'Название',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Пара',
		dataIndex: 'symbol',
		key: 'symbol',
	},
	{
		title: 'Циклы',
		dataIndex: 'cycles_completed',
		key: 'cycles_completed',
	},
	{
		title: 'Депозит (USDT)',
		dataIndex: 'deposit_usdt',
		key: 'deposit_usdt',
		render: (value: number) => `${value.toFixed(2)} USDT`,
	},
	{
		title: 'Профит (USDT)',
		dataIndex: 'profit_usdt',
		key: 'profit_usdt',
		render: (value: number) => `${value.toFixed(2)} USDT`,
	},
	{
		title: 'Доходность (%)',
		dataIndex: 'profit_percentage',
		key: 'profit_percentage',
		render: (value: number) => <Text type={value >= 0 ? 'success' : 'danger'}>{value.toFixed(2)}%</Text>,
	},
];
