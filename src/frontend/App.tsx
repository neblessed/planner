import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./src/pages/Home/Home";
import UsersPage from "./src/pages/Users";
import ErrorPage from "./src/pages/Error";

const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "users", element: <UsersPage /> },
    { path: "*", element: <ErrorPage /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
