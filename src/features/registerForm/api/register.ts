import { requestTemplate } from '@/shared';

import { IRegisterResponse } from '../model/IRegisterForm';

const register = async (payload: { email: string; password: string }) =>
	requestTemplate.post<IRegisterResponse>('/register', payload);

export default register;
