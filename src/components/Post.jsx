import { Link } from "react-router-dom"

export default function Post({post}) {
  return(
    <div>
      <section className='post'>
        <h3>{post.title}</h3>
        <p>
          {post.content.slice(0, 100)} ...
          <Link to={`/posts/${post.id}`} >Read more</Link>
          </p>
        <p>
          Published on: {(new Date(post.publishedAt)).toDateString()} by 
          <span> {post.author}</span>  
        </p>
      </section>
    </div>
  )
}