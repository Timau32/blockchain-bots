import { Table } from 'antd';
import { memo, useMemo } from 'react';

import { STATISTICS_COLUMNS } from '../constants/StatisticsColumns';
import { IStatistics } from '../model/IStatistics';

interface StatisticsTableProps {
	data: IStatistics[];
}

const StatisticsTablePure = ({ data }: StatisticsTableProps) => {
	const extendedData = useMemo(() => {
		const totalStats = data.reduce(
			(acc, stat) => {
				acc.deposit_usdt += stat.deposit_usdt;
				acc.profit_usdt += stat.profit_usdt;
				return acc;
			},
			{ deposit_usdt: 0, profit_usdt: 0 },
		);

		const totalProfitPercent =
			totalStats.deposit_usdt > 0 ? (totalStats.profit_usdt / totalStats.deposit_usdt) * 100 : 0;

		const totalRow: IStatistics = {
			id: 'total',
			name: 'Итого',
			symbol: '',
			cycles_completed: 0,
			deposit_usdt: totalStats.deposit_usdt,
			profit_usdt: totalStats.profit_usdt,
			profit_percentage: +totalProfitPercent.toFixed(2),
		};
		return [...data, totalRow];
	}, [data]);

	return (
		<Table
			dataSource={extendedData}
			columns={STATISTICS_COLUMNS}
			rowKey="id"
			pagination={false}
			bordered
		/>
	);
};

export const StatisticsTable = memo(StatisticsTablePure);
