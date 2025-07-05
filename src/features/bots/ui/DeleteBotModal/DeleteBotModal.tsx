import { Button, Modal, Typography } from 'antd';

import { IBot } from '@/entities';

interface Props {
	open: boolean;
	bot: IBot | null;
	onClose: () => void;
	onConfirm: () => void;
	loading?: boolean;
}

export const DeleteBotModal = ({ open, bot, onClose, onConfirm, loading }: Props) => {
	return (
		<Modal
			open={open}
			onCancel={onClose}
			okText="Удалить"
			title="Удаление бота"
            onOk={onConfirm}
            loading={loading}
		>
			<Typography.Paragraph>
				Вы уверены, что хотите удалить бота{' '}
				<Typography.Text
					strong
					type="danger"
				>
					{bot?.name}
				</Typography.Text>
				?
			</Typography.Paragraph>
		</Modal>
	);
};
