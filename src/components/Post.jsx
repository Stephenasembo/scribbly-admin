import { Link } from "react-router-dom"
import Button from "./Button"

export default function Post({post, updatePost}) {
  async function togglePublishStatus() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const url = `${baseUrl}admin/posts/${post.id}`;
    const token = localStorage.getItem('jwt')
    let response = await fetch(url, {
      mode: 'cors',
      method: 'PATCH',
      headers: {
        'Authorization': token
      }
    });
    if (response.status !== 200) {
      let errorData = await response.json();
      return console.log(errorData);
    }
    response = await response.json();
    console.log(response);
    updatePost((count) => count + 1);
  }

  return(
    <div>
      <section className='post'>
        <h3>{post.title}</h3>
        <p>
          {post.content.slice(0, 100)} ...
          <Link to={`/posts/${post.id}`} >Read more</Link>
          </p>
        {post.published ?
        <p>
          Published on: {(new Date(post.publishedAt)).toDateString()} by 
          <span> {post.author}</span>  
        </p> :
        <p>
          Post not yet published.
        </p>
        }
        <p>
          {post.published ?
          <Button
          text='Unpublish'
          onClick={togglePublishStatus}
          /> :
          <Button
          text='Publish'
          onClick={togglePublishStatus}
          />
          }
        </p>
      </section>
    </div>
  )
}