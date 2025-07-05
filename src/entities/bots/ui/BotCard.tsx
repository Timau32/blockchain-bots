import { RightOutlined } from '@ant-design/icons';
import { Button, Card, Space, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import styles from './BotCard.module.scss';

import { IBot } from '../model/IBot';
import { statusColorMap } from '../model/IBot';

const { Text, Title } = Typography;

interface BotCardProps {
	bot: IBot;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
}

export const BotCard = ({ bot, onEdit, onDelete }: BotCardProps) => {
	const navigate = useNavigate();
	const [base, quote] = bot.symbol.split('/');

	const onCardClick = () => navigate(`/bots/${bot.id}`);
	const onEditClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onEdit?.(bot.id);
	};

	const onDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onDelete?.(bot.id);
	};

	return (
		<Card
			className={styles.card}
			onClick={onCardClick}
			hoverable
		>
			<div className={styles.header}>
				<Title level={4}>{bot.name}</Title>
				<Tag color={statusColorMap[bot.status]}>{bot.status}</Tag>
			</div>

			<div className={styles.row}>
				<Text strong>Пара:</Text>
				<Space size={4}>
					<Text>{base}</Text>
					<RightOutlined />
					<Text>{quote}</Text>
				</Space>
			</div>

			<div className={styles.row}>
				<Text strong>Депозит:</Text>
				<Text>{bot.deposit} USDT</Text>
			</div>

			<div className={styles.row}>
				<Text strong>Прибыль:</Text>
				<Text>{bot.profit_percentage}%</Text>
			</div>

			<div className={styles.row}>
				<Text strong>Ордеров:</Text>
				<Text>{bot.num_orders}</Text>
			</div>

			<div className={styles.row}>
				<Text strong>Сетка:</Text>
				<Text>{bot.grid_length}%</Text>
			</div>

			<div className={styles.footer}>
				<Button
					type="primary"
					onClick={onEditClick}
				>
					Редактировать
				</Button>

				<Button
					type="primary"
					onClick={onDeleteClick}
					danger
				>
					Удалить бота
				</Button>
			</div>
		</Card>
	);
};
