import { Link } from "react-router-dom"

export default function ForbiddenPage() {
  return (
    <div>
      <h1>Forbidden</h1>
      <p>
        You can not access this resource unless you are an admin.
      </p>
      <p>
        You can go back home by clicking <Link to="/">home</Link>
      </p>
    </div>
  )
}