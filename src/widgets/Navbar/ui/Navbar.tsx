import { AppstoreOutlined, BarChartOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN, Container, REFRESH_TOKEN, deleteCookie } from '@/shared';

const { Header } = Layout;

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const items = [
		{
			key: '/bots',
			icon: <AppstoreOutlined />,
			label: 'Список ботов',
		},
		{
			key: '/bots/create',
			icon: <PlusOutlined />,
			label: 'Создание бота',
		},
		{
			key: '/statistics',
			icon: <BarChartOutlined />,
			label: 'Статистики ботов',
		},
		{
			key: 'logout',
			icon: <LogoutOutlined />,
			label: 'Выход',
			style: { marginLeft: 'auto' }, // Только в Ant Design 5+ с поддержкой style
		},
	];

	const handleMenuClick = ({ key }: { key: string }) => {
		if (key === 'logout') {
			deleteCookie(ACCESS_TOKEN);
			deleteCookie(REFRESH_TOKEN);
			navigate('/');
		} else {
			navigate(key);
		}
	};

	return (
		<Layout>
			<Header style={{ backgroundColor: '#fff', padding: 0 }}>
				<Container>
					<Menu
						mode="horizontal"
						selectedKeys={[location.pathname]}
						items={items}
						onClick={handleMenuClick}
					/>
				</Container>
			</Header>

			<Outlet />
		</Layout>
	);
};

export default Navbar;
