export interface IUser {
	id: number;
	email: string;
	username: string;
}
export interface IResponse {
	jwt: string;
	user: IUser;
}
