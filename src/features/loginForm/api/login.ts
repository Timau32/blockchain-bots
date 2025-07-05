import { ITokenData, requestTemplate } from '@/shared';

export const login = async (payload: { email: string; password: string }) =>
	requestTemplate.post<ITokenData>('/login', payload);
