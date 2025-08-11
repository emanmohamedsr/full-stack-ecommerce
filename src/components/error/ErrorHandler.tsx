import { Link, useLocation, useRouteError } from "react-router-dom";

interface IProps {
	defaultStatusCode?: number;
	defaultTitle?: string;
	showRefresh?: boolean;
	showHome?: boolean;
}

const ErrorHandler = ({
	defaultStatusCode = 500,
	defaultTitle = "Server Error",
	showRefresh = true,
	showHome = true,
}: IProps) => {
	type RouteError = {
		status?: number;
		message?: string;
		[key: string]: unknown;
	};

	const error = useRouteError() as RouteError | undefined;

	const { pathname } = useLocation();

	const statusCode = error?.status || defaultStatusCode;

	const errorMessage = error?.message || defaultTitle;

	return (
		<div>
			<h1>{statusCode}</h1>
			<p>{errorMessage}</p>
			{showHome && <Link to='/'>Go Home</Link>}
			<br />
			{showRefresh && (
				<button onClick={() => window.location.replace(pathname)}>
					Refresh Page
				</button>
			)}
		</div>
	);
};
export default ErrorHandler;
