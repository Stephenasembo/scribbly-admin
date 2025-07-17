import Index from "./components/Index";
import ErrorPage from "./components/ErrorPage";
import LoginForm from "./components/LoginForm";

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
]

export default routes;