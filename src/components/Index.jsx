import { Link } from "react-router-dom"

export default function Index() {
  return (
    <div>
      <h1>Scribbly Admin</h1>
      <h2>Become an admin to create posts or moderate comments.</h2>
      <div>
        <p>
          Not an admin yet ?
          Sign up as an admin. <Link to="/signup">Sign up</Link>
        </p>
        <p>
          Login back to your account here. <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}