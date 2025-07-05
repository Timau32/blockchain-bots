import axios, { InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN } from '../config/configs';
import { IRefreshTokenData } from '../models/ITokens';
import { deleteCookie, getCookie, setCookie } from '../lib/cookies';

const requestTemplate = axios.create({ baseURL: API_URL });
const authedTemplate = axios.create({ baseURL: API_URL });


const refreshToken = (payload: { refresh_token: string }) =>
	requestTemplate.post<IRefreshTokenData>('/refresh/', payload);

authedTemplate.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
	let accessToken = getCookie(ACCESS_TOKEN);
	let decodeInfo: any;
	if (accessToken) {
		try {
			decodeInfo = jwtDecode(accessToken);
		} catch (error) {
			Promise.reject('Error decoding token');
		}
		const expTime = decodeInfo?.exp && decodeInfo.exp * 1000;
		const curTime = new Date().getTime();

		if (expTime && expTime - curTime <= 50000) {
			const refresh_token = getCookie(REFRESH_TOKEN);
			if (refresh_token) {
				try {
					const freshTokens = await refreshToken({ refresh_token });
					setCookie(ACCESS_TOKEN, freshTokens.data.access_token, freshTokens.data.access_expires);
					accessToken = freshTokens.data.access_token;
				} catch (error) {
					Promise.reject('Error refreshing tokens');
					deleteCookie(ACCESS_TOKEN);
					deleteCookie(REFRESH_TOKEN);
					window.location.href = `/`;
				}
			}
		}

		config.headers!.Authorization = `Bearer ${accessToken}`;
	} else {
		setCookie(ACCESS_TOKEN, '', 1);
	}
	return config;
});


export {authedTemplate, requestTemplate}