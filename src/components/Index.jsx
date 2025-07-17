import { Link } from "react-router-dom"

export default function Index() {
  return (
    <div>
      <h1>Scribbly Admin</h1>
      <p>Login back as an admin to create posts or moderate comments.</p>
      <div>
        <p>
          Login back to your account here. <Link to="/login">Login</Link>
        </p>
        <p>
          Not an admin yet ? <br /> <br />
          If you want to get promoted to admin status contact Stephen Asembo for the admin passcode needed for admin status promotion.
        </p>
      </div>
    </div>
  )
}