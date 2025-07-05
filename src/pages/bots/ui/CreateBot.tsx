import { Card, Typography } from 'antd';

import { CreateBotForm } from '@/features';

const { Title } = Typography;

export default function CreateBot() {
	return (
		<Card style={{ maxWidth: 600, margin: '40px auto' }}>
			<Title level={3}>Создание торгового бота</Title>
			<CreateBotForm />
		</Card>
	);
}
