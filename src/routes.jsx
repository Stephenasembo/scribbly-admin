import Index from "./components/Index";
import ErrorPage from "./components/ErrorPage";
import LoginForm from "./components/LoginForm";
import ForbiddenPage from "./components/ForbiddenPage";
import Homepage from "./components/Homepage";
import PostPage from "./components/PostPage";
import PostForm from "./components/PostForm";
import SignupForm from "./components/SignupForm";

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
    path: 'signup',
    element: <SignupForm />,
  },
  {
    path: 'forbidden',
    element: <ForbiddenPage />,
  },
  {
    path: 'app',
    element: <Homepage />,
  },
  {
    path: 'posts/:postId',
    element: <PostPage />
  },
  {
    path: 'post-form',
    element: <PostForm />
  }
]

export default routes;