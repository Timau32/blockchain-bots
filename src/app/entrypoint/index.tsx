import { App as AntdApp, ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { BrowserRouter } from 'react-router-dom';

import { colors } from '@/shared';

import AppRoutes from '../routes/AppRoutes';

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: colors.primary100,
					colorBgTextActive: colors.hover100,
					colorBgTextHover: colors.hover100,
					colorFillAlter: colors.hover100,
					colorBgLayout: colors.verylightgrey,
				},
				components: {
					Tabs: {
						colorBgContainer: '#fff',
						colorBgTextActive: colors.verylightgrey,
						colorBgTextHover: colors.verylightgrey,
						colorFillAlter: colors.verylightgrey,
					},
				},
			}}
		>
			<AntdApp>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</AntdApp>
		</ConfigProvider>
	);
}

export default App;
