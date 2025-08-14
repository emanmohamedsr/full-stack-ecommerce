// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { Provider as ReducxProvider } from "react-redux";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
	<ReducxProvider store={store}>
		<Provider>
			<App />
		</Provider>
	</ReducxProvider>,
);
