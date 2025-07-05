import { Button, Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import { useState } from 'react';

import { IBot, statusesEnum } from '@/entities';
import styles from './EditBotModal.module.scss';

import { createBotPayloadType } from '../../model/CreateBotPayload';

interface Props {
	open: boolean;
	onClose: () => void;
	initialValues: IBot;
    loading: boolean;
    onSubmit: (values: createBotPayloadType) => void;
}

export const EditBotModal = ({ open, onClose, initialValues, onSubmit, loading }: Props) => {
	const [form] = Form.useForm<IBot>();


	const statusOptions = Object.values(statusesEnum).map(status => ({
		label: status,
		value: status,
	}));

	return (
		<Modal
			title="Редактирование торгового бота"
			open={open}
			onCancel={onClose}
			footer={null}
            onOk={form.submit}
            loading={loading}
		>
			<Form
				form={form}
				layout="vertical"
				initialValues={initialValues}
				onFinish={onSubmit}
				className={styles.form}
			>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name="name"
							label="Название бота"
							rules={[{ required: true }]}
						>
							<Input />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item
							name="symbol"
							label="Торговая пара"
							rules={[{ required: true }]}
						>
							<Input />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item
							name="deposit"
							label="Депозит (USDT)"
							rules={[{ required: true }]}
						>
							<InputNumber style={{ width: '100%' }} />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item
							name="profit_percentage"
							label="Целевой % прибыли"
							rules={[{ required: true }]}
						>
							<InputNumber
								style={{ width: '100%' }}
								addonAfter="%"
							/>
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item
							name="num_orders"
							label="Количество ордеров"
							rules={[{ required: true }]}
						>
							<InputNumber style={{ width: '100%' }} />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item
							name="grid_length"
							label="Длина сетки (%)"
							rules={[{ required: true }]}
						>
							<InputNumber
								style={{ width: '100%' }}
								addonAfter="%"
							/>
						</Form.Item>
					</Col>

					<Col span={24}>
						<Form.Item
							name="status"
							label="Статус бота"
							rules={[{ required: true }]}
						>
							<Select options={statusOptions} />
						</Form.Item>
					</Col>
				</Row>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						block
						loading={loading}
					>
						Сохранить изменения
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};
