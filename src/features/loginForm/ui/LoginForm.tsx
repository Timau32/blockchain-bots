import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { App, Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN, REFRESH_TOKEN, setCookie } from '@/shared';

import { login } from '../api/login';
import ILoginForm from '../model/ILoginForm';

export default function LoginForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [form] = Form.useForm();
	const { message } = App.useApp();
	const navigate = useNavigate();

	const onFinish = async (values: ILoginForm) => {
		try {
			setIsLoading(true);
			const response = await login(values);
			setCookie(ACCESS_TOKEN, response.data.access_token, response.data.access_expires);
			setCookie(REFRESH_TOKEN, response.data.refresh_token, response.data.refresh_expires);
			message.success('Вы успешно вошли в систему!');
			navigate('/bots');
		} catch (err) {
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Form
			form={form}
			name="login"
			layout="vertical"
			onFinish={onFinish}
		>
			<Form.Item
				name="email"
				label="Логин"
				rules={[
					{ required: true, message: 'Введите почту' },
					{ type: 'email', message: 'Некорректная почта' },
				]}
			>
				<Input
					prefix={<UserOutlined />}
					placeholder="Введите e-mail"
				/>
			</Form.Item>

			<Form.Item
				name="password"
				label="Пароль"
				rules={[{ required: true, message: 'Введите пароль' }]}
			>
				<Input.Password
					prefix={<LockOutlined />}
					placeholder="Введите пароль"
				/>
			</Form.Item>

			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					block
					loading={isLoading}
				>
					Войти
				</Button>
			</Form.Item>
		</Form>
	);
}
