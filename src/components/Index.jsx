import { Link } from "react-router-dom"

export default function Index() {
  return (
    <div>
      <h1>Scribbly Admin</h1>
      <h2>Login back as an admin to create posts or moderate comments.</h2>
      <div>
        <p>
          Not an admin yet ?
          You have to login to your account first before being promoted to an admin.
        </p>
        <p>
          Login back to your account here. <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}