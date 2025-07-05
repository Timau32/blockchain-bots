import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

import styles from './Register.module.scss';
import { RegisterForm } from '@/features';

const { Title, Text } = Typography;

export default function Register() {
	return (
		<div className={styles.wrapper}>
			<Card className={styles.card}>
				<Title
					level={3}
					className={styles.title}
				>
					Регистрация
				</Title>

				<RegisterForm />

				<div className={styles.loginLink}>
					<Text type="secondary">Уже есть аккаунт?</Text> <Link to="/">Войти</Link>
				</div>
			</Card>
		</div>
	);
}
