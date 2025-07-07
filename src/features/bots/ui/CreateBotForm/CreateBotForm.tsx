import { App, Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { useState } from 'react';

import styles from './CreateBotForm.module.scss';
import { statusesEnum } from '@/entities/bots/model/IBot';

import { createBot } from '../../api/bots';
import type { createBotPayloadType } from '../../model/CreateBotPayload';

export const CreateBotForm = () => {
	const [loading, setIsLoading] = useState(false);
	const [form] = Form.useForm<createBotPayloadType>();
	const { message } = App.useApp();

	const handleSubmit = async (values: createBotPayloadType) => {
		try {
			setIsLoading(true);
			await createBot({ ...values, status: statusesEnum.ACTIVE });
			message.success(`Бот ${values.name} успешно создан!`);
			form.resetFields();
		} catch (error) {
			message.error('Ошибка при создании бота');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={handleSubmit}
			className={styles.form}
		>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						name="name"
						label="Название бота"
						rules={[{ required: true, message: 'Введите название' }]}
					>
						<Input placeholder="BTC Grid Bot" />
					</Form.Item>
				</Col>

				<Col span={12}>
					<Form.Item
						name="symbol"
						label="Торговая пара"
						rules={[{ required: true, message: 'Укажите символ' }]}
					>
						<Input placeholder="BTC/USDT" />
					</Form.Item>
				</Col>

				<Col span={12}>
					<Form.Item
						name="deposit"
						label="Депозит (USDT)"
						rules={[{ required: true, type: 'number', min: 0 }]}
					>
						<InputNumber
							placeholder="1000"
							style={{ width: '100%' }}
						/>
					</Form.Item>
				</Col>

				<Col span={12}>
					<Form.Item
						name="profit_percentage"
						label="Целевой % прибыли"
						rules={[{ required: true, type: 'number', min: 0 }]}
					>
						<InputNumber
							placeholder="0.5"
							addonAfter="%"
							style={{ width: '100%' }}
						/>
					</Form.Item>
				</Col>

				<Col span={12}>
					<Form.Item
						name="num_orders"
						label="Количество ордеров"
						rules={[{ required: true, type: 'number', min: 1 }]}
					>
						<InputNumber
							placeholder="10"
							style={{ width: '100%' }}
						/>
					</Form.Item>
				</Col>

				<Col span={12}>
					<Form.Item
						name="grid_length"
						label="Длина сетки (%)"
						rules={[
							{ required: true, message: 'Пожалуйста, укажите длину сетки' },
							{ type: 'number', min: 0, max: 100, message: 'Значение должно быть от 0 до 100' },
						]}
					>
						<InputNumber
							min={0}
							max={100}
							style={{ width: '100%' }}
							addonAfter="%"
						/>
					</Form.Item>
				</Col>

				{/* <Col span={24}>
					<Form.Item
						name="status"
						label="Статус бота"
						rules={[{ required: true, message: 'Выберите статус' }]}
					>
						<Select
							placeholder="Выберите статус"
							options={statusOptions}
						/>
					</Form.Item>
				</Col> */}
			</Row>

			<Form.Item shouldUpdate>
				{() => (
					<Button
						type="primary"
						htmlType="submit"
						loading={loading}
						block
						disabled={
							!form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length
						}
					>
						Создать бота
					</Button>
				)}
			</Form.Item>
		</Form>
	);
};
