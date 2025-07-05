import { App } from 'antd';
import { JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { BotPage, BotsDetailsPage, CreateBotPage, LoginPage, NotFoundPage, RegisterPage, StatisticsPage } from '@/pages';
import { ACCESS_TOKEN, getCookie } from '@/shared';
import { Navbar } from '@/widgets';

export default function AppRoutes() {
	return (
		<Routes>
			<Route
				path="/"
				element={<LoginPage />}
			/>
			<Route
				path="/register"
				element={<RegisterPage />}
			/>
			<Route element={<Navbar />}>
				<Route
					path="/bots"
					element={
						<Protected>
							<BotPage />
						</Protected>
					}
				/>
				<Route
					path="/bots/:id"
					element={
						<Protected>
							<BotsDetailsPage />
						</Protected>
					}
				/>

				<Route
					path="/bots/create"
					element={
						<Protected>
							<CreateBotPage />
						</Protected>
					}
				/>

				<Route path="*" element={<NotFoundPage />} />

				<Route
					path="/statistics"
					element={
						<Protected>
							<StatisticsPage />
						</Protected>
					}
				/>
			</Route>
		</Routes>
	);
}

const Protected = ({ children }: { children: JSX.Element }) => {
	const { message } = App.useApp();
	const accessToken = getCookie(ACCESS_TOKEN);

	if (!accessToken) {
		message.error('Сперва войдите в систему чтобы продолжить');
		return <Navigate to="/" />;
	}

	return children;
};
