import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { App, Button, Form, Input } from 'antd';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import register from '../api/register';
import { IRegisterForm } from '../model/IRegisterForm';

function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false);
	const { message } = App.useApp();
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const onFinish = async ({ confirm, ...values }: IRegisterForm) => {
		try {
			setIsLoading(true);
			const response = await register(values);
			navigate('/');
			message.success('Вы успешно зарегистрированы! Ввойдите в систему');
		} catch (err) {
			if (isAxiosError(err)) {
				message.error(err.response?.data?.error);
			} else {
				message.error('Ошибка регистрации');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form
			form={form}
			name="register"
			layout="vertical"
			onFinish={onFinish}
		>
			<Form.Item
				name="email"
				label="Почта"
				rules={[
					{ required: true, message: 'Введите почту' },
					{ type: 'email', message: 'Некорректная почта' },
				]}
			>
				<Input
					prefix={<MailOutlined />}
					placeholder="Введите e-mail"
				/>
			</Form.Item>

			<Form.Item
				name="password"
				label="Пароль"
				rules={[{ required: true, message: 'Введите пароль' }]}
				hasFeedback
			>
				<Input.Password
					prefix={<LockOutlined />}
					placeholder="Придумайте пароль"
				/>
			</Form.Item>

			<Form.Item
				name="confirm"
				label="Подтвердите пароль"
				dependencies={['password']}
				hasFeedback
				rules={[
					{ required: true, message: 'Подтвердите пароль' },
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('Пароли не совпадают'));
						},
					}),
				]}
			>
				<Input.Password
					prefix={<LockOutlined />}
					placeholder="Повторите пароль"
				/>
			</Form.Item>

			<Form.Item shouldUpdate>
				{() => (
					<Button
						type="primary"
						htmlType="submit"
						block
						loading={isLoading}
						disabled={
							!form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length
						}
					>
						Зарегистрироваться
					</Button>
				)}
			</Form.Item>
		</Form>
	);
}

export default RegisterForm;
