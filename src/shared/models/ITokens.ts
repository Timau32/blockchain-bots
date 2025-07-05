export interface ITokenData {
	access_token: string;
	refresh_token: string;
	access_expires: number;
	refresh_expires: number;
	token_type: 'Bearer';
}

export interface IRefreshTokenData {
	access_token: string;
	access_expires: number;
	token_type: 'Bearer';
}
