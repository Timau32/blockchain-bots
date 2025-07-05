import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { LoginForm } from '../../../features';
import styles from './Login.module.scss';

const { Title, Text } = Typography;

export default function Login() {
	return (
		<div className={styles.wrapper}>
			<Card className={styles.card}>
				<Title
					level={3}
					className={styles.title}
				>
					Вход в систему
				</Title>

				<LoginForm />

				<div className={styles.register}>
					<Text type="secondary">Нет аккаунта?</Text> <Link to="/register">Зарегистрироваться</Link>
				</div>
			</Card>
		</div>
	);
}
