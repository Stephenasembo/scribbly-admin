import Index from "./components/Index";
import ErrorPage from "./components/ErrorPage";
import LoginForm from "./components/LoginForm";
import ForbiddenPage from "./components/ForbiddenPage";

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
]

export default routes;