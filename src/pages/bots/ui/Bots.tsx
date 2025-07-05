import { App, Skeleton } from 'antd';
import { Suspense, useCallback, useEffect, useState } from 'react';

import { IBot } from '@/entities';
import { BotList, DeleteBotModal, EditBotModal, createBotPayloadType, deleteBot, editBot, getBots } from '@/features';

export default function Bot() {
	const [bots, setBots] = useState<IBot[]>([]);
	const [loading, setLoading] = useState(false);

	const [selectedEditBot, setSelectedEditBot] = useState<IBot | null>(null);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const { message } = App.useApp();

	useEffect(() => {
		getBots().then(res => setBots(res.data));
	}, []);

	const onCloseEditModal = () => {
		setOpenEditModal(false);
		setSelectedEditBot(null);
	};

	const onCloseDeleteModal = () => {
		setOpenDeleteModal(false);
		setSelectedEditBot(null);
	};

	const onEditClick = useCallback(
		(id: string) => {
			const bot = bots.find(bot => bot.id === id);
			if (bot) {
				setSelectedEditBot(bot);
				setOpenEditModal(true);
			}
		},
		[bots],
	);

	const onDeleteClick = useCallback(
		(id: string) => {
			const bot = bots.find(bot => bot.id === id);
			if (bot) {
				setSelectedEditBot(bot);
				setOpenDeleteModal(true);
			}
		},
		[bots],
	);

	const onSubmit = async (values: createBotPayloadType) => {
		try {
			setLoading(true);
			const response = await editBot({ ...values, id: selectedEditBot?.id! });
			setBots(prev => prev.map(bot => (bot.id === response.data.id ? response.data : bot)));
			message.success('Торговый бот успешно обновлен');
		} catch (err) {
			message.error('Ошибка при обновлении торгового бота');
		} finally {
			setLoading(false);
			onCloseEditModal();
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			const response = await deleteBot(selectedEditBot!.id);
			setBots(prev => prev.filter(bot => (bot.id !== response.data.id )));
			message.success(`Торговый бот ${selectedEditBot?.name} успешно удален`);
		} catch (err) {
			message.error('Ошибка при удалении торгового бота');
		} finally {
			setLoading(false);
			onCloseDeleteModal();
		}
	};

	return (
		<>
			{loading ? (
				<Skeleton active />
			) : (
				<BotList
					bots={bots}
					onEdit={onEditClick}
					onDelete={onDeleteClick}
				/>
			)}

			{openEditModal && (
				<Suspense fallback={<div>Загрузка...</div>}>
					<EditBotModal
						open={openEditModal}
						initialValues={selectedEditBot!}
						onClose={onCloseEditModal}
						onSubmit={onSubmit}
						loading={loading}
					/>
				</Suspense>
			)}

			{openDeleteModal && (
				<Suspense fallback={<div>Загрузка...</div>}>
					<DeleteBotModal
						open={openDeleteModal}
						bot={selectedEditBot!}
						onClose={onCloseDeleteModal}
						onConfirm={onDelete}
						loading={loading}
					/>
				</Suspense>
			)}
		</>
	);
}
