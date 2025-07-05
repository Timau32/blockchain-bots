import { IUser } from '@/shared';

export interface IRegisterForm {
	email: string;
	password: string;
	confirm: string;
}

export interface IRegisterResponse {
	access_token: string;
	user: IUser;
}
