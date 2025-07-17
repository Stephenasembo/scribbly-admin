import Index from "./components/Index";
import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
]

export default routes;