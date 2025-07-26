import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from "./routes";
import PostContext from "./components/PostContext";

const router = createBrowserRouter(routes);

function App() {
  return (
    <PostContext>
      <RouterProvider router={router} />
    </PostContext>
  )
}

export default App
