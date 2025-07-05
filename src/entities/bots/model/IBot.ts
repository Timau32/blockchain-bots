export interface IBot {
	id: string;
	name: string;
	status: statusesEnum;
	symbol: string;
	deposit: number;
	profit_percentage: number;
	num_orders: number;
	grid_length: number;
}

export enum statusesEnum {
	ACTIVE = 'ACTIVE',
	PAUSE = 'PAUSE',
	ERROR = 'ERROR',
}

export enum statusColorMap {
	ACTIVE = 'green',
	PAUSE = 'orange',
	ERROR = 'red',
}
