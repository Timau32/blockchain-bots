import { IBot } from '@/entities';
import { authedTemplate } from '@/shared';

import { createBotPayloadType } from '../model/CreateBotPayload';

export const getBots = () => authedTemplate.get<IBot[]>('/bots');
export const createBot = (payload: createBotPayloadType) => authedTemplate.post('/bots', payload);
export const editBot = ({ id, ...payload }: IBot) => authedTemplate.put(`/bots/${id}`, payload);
export const deleteBot = (id: string) => authedTemplate.delete(`/bots/${id}`);

export const getBotById = (id: string) => authedTemplate.get<IBot>(`/bots/${id}`);
