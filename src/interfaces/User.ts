interface IRole {
	id: number;
	documentId: string;
	name: string;
}
export interface IUser {
	id: number;
	documentId: string;
	email: string;
	username: string;
	role?: IRole;
}
export interface IResponse {
	jwt: string;
	user: IUser;
}
