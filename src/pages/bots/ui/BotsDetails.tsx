import { Button, Card, Descriptions, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IBot } from '@/entities';
import { getBotById } from '@/features';
import { Container } from '@/shared';

export default function BotsDetailsPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [bot, setBot] = useState<IBot | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!id) return;
		getBotById(id).then(res => {
			setBot(res.data);
			setLoading(false);
		});
	}, [id]);

	if (loading) return <Typography.Text>Загрузка...</Typography.Text>;
	if (!bot) return <Typography.Text type="danger">Бот не найден</Typography.Text>;

	return (
		<Container>
			<Card
				title="Информация о боте"
				extra={<Button onClick={() => navigate(-1)}>Назад</Button>}
        style={{marginTop: '20px'}}
			>
				<Descriptions
					column={1}
					bordered
					size="middle"
				>
					<Descriptions.Item label="Название">{bot.name}</Descriptions.Item>
					<Descriptions.Item label="Статус">{bot.status}</Descriptions.Item>
					<Descriptions.Item label="Торговая пара">{bot.symbol}</Descriptions.Item>
					<Descriptions.Item label="Депозит (USDT)">{bot.deposit}</Descriptions.Item>
					<Descriptions.Item label="Целевой % прибыли">{bot.profit_percentage}%</Descriptions.Item>
					<Descriptions.Item label="Количество ордеров">{bot.num_orders}</Descriptions.Item>
					<Descriptions.Item label="Длина сетки">{bot.grid_length}%</Descriptions.Item>
				</Descriptions>
			</Card>
		</Container>
	);
}
