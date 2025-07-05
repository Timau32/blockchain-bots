import { IBot } from '@/entities';

export type createBotPayloadType = Omit<IBot, 'id'>;

