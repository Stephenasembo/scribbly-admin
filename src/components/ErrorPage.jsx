import { Link } from "react-router-dom"

export default function ErrorPage() {
  return (
    <div>
      <h1>Oh no, this page does not exist!</h1>
      <p>
        You can go back home by clicking <Link to="/">home</Link>
      </p>
    </div>
  )
}