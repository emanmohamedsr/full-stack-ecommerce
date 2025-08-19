export interface IError {
	data: {
		error?: {
			status?: number;
			message?: string;
		};
	};
}
