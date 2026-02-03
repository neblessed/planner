import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./src/pages/Home/Home";
import ClientsPage from "./src/pages/Clients/Clients";
import ErrorPage from "./src/pages/Error";
import Header from "./src/components/Header/Header";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Header />
                <HomePage />
            </>
        ),
    },
    {
        path: "users",
        element: (
            <>
                <Header />
                <ClientsPage />
            </>
        ),
    },
    {
        path: "*",
        element: (
            <>
                <Header />
                <ErrorPage />
            </>
        ),
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
