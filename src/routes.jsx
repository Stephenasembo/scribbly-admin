import Index from "./components/Index";
import ErrorPage from "./components/ErrorPage";
import LoginForm from "./components/LoginForm";
import ForbiddenPage from "./components/ForbiddenPage";
import Homepage from "./components/Homepage";

const routes = [
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <LoginForm />,
  },
  {
    path: 'forbidden',
    element: <ForbiddenPage />,
  },
  {
    path: 'app',
    element: <Homepage />,
  },
]

export default routes;