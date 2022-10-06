import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/detail/:countryId",
        element: <Detail />,
    },
]);

function RouterCom() {
    return <RouterProvider router={router} />
}

export default RouterCom