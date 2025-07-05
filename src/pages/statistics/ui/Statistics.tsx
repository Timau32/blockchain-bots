import { App, Skeleton } from 'antd';
import { useEffect, useState } from 'react';

import { IStatistics, StatisticsTable, getStatistics } from '@/features';
import { Container } from '@/shared';

export default function Statistics() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<IStatistics[]>([]);
	const { message } = App.useApp();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await getStatistics();
				setData(response.data);
			} catch (error) {
				message.error('Ошибка при загрузке статистики');
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (isLoading) return <Skeleton active />;

	return (
		<div style={{ margin: '20px 0' }}>
			<Container>
				<StatisticsTable data={data || []} />
			</Container>
		</div>
	);
}
