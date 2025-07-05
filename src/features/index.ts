import type { createBotPayloadType } from './bots/model/CreateBotPayload';
import BotList from './bots/ui/BotsList/BotList';
import LoginForm from './loginForm/ui/LoginForm';
import RegisterForm from './registerForm/ui/RegisterForm';

export type { IStatistics } from './statistics/model/IStatistics';

export { getBots, createBot, editBot, deleteBot, getBotById } from './bots/api/bots';
export { CreateBotForm } from './bots/ui/CreateBotForm/CreateBotForm';
export { getStatistics } from './statistics/api/statistics';
export { StatisticsTable } from './statistics/ui/StatisticsTable';
export { EditBotModal } from './bots/ui/EditModal/EditModal';
export { DeleteBotModal } from './bots/ui/DeleteBotModal/DeleteBotModal';

export { LoginForm, RegisterForm, BotList, createBotPayloadType };
