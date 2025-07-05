import IUser from './models/IUser';
import colors from './styles/colors.module.scss';
import Container from './ui/Container/Container';


export * from './api/instance';
export * from './lib/cookies';

export type { ITokenData } from './models/ITokens';
export { ACCESS_TOKEN, REFRESH_TOKEN } from './config/configs';

export type { IUser };
export { colors, Container };
