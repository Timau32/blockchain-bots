import { Col, Row } from 'antd';
import { memo } from 'react';

import { BotCard } from '@/entities';
import type { IBot } from '@/entities';
import { Container } from '@/shared';

interface BotListProps {
	bots: IBot[];
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
}

function BotList({ bots, onEdit, onDelete }: BotListProps) {
	return (
		<Container>
			<Row gutter={[16, 16]}>
				{bots.map(bot => (
					<Col
						key={bot.id}
						xs={24}
						sm={12}
						md={8}
						lg={6}
					>
						<BotCard
							bot={bot}
							onEdit={onEdit}
							onDelete={onDelete}
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default memo(BotList);
