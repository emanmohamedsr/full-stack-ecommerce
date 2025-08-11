import { Link } from "react-router-dom";

const PageNotFound = () => {
	return (
		<div>
			<span>404 Oops!</span> <span>Page not found</span>
			<p>The page you're looking for doesn't exist.</p>
			<Link to={"/"}>Go Home</Link>
		</div>
	);
};

export default PageNotFound;
