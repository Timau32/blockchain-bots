import { authedTemplate } from '@/shared';

import { IStatistics } from '../model/IStatistics';

export const getStatistics = () => authedTemplate.get<IStatistics[]>('/stats');
