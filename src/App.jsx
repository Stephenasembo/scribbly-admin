import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from "./routes";
import PostContext from "./components/PostContext";
import { AuthComponent } from "./components/AuthComponent";

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthComponent>
      <PostContext>
        <RouterProvider router={router} />
      </PostContext>
    </AuthComponent>
  )
}

export default App
