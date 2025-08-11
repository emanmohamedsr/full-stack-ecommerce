import { RouterProvider } from "react-router-dom";
import router from "./router/inex";

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
