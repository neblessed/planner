import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { setupStore } from "./src/store/index.ts";
import { Provider } from "react-redux";

const store = setupStore();

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
