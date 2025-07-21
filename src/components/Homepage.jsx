import { useEffect, useState } from "react";
import Post from "./Post";
import { Link, useNavigate } from "react-router-dom"
import Button from "./Button";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [postCounter, setPostCounter] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const url = `${baseUrl}admin/posts`;

    async function fetchPosts() {
      const token = localStorage.getItem('jwt');
      let response = await fetch (url, {
        mode: 'cors',
        headers: {
          'Authorization': token
        }
      })
      if (response.status === 200) {
        response = await response.json();
        setPosts(response.data)
      } else {
        console.log('An error occurred when fetching posts')
      }
    }

    fetchPosts()
      .then(() => setStatus('data'))
      .catch(() => setStatus('error'))
  }, [postCounter])

  return(
    <div>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/posts'>Posts</Link>
    </nav>
    <header>
      <h1>Welcome to Scribbly.</h1>
      <div>
        <p>
          Explore thoughts, stories and ideas from seasoned writers.
        </p>
        <p>
          <Button
          text='Start reading'
          />
          <Button
          text='Create Post'
          onClick={() => navigate('/post-form')}
          />
        </p>
      </div>
    </header>
    <main>
      {status === 'loading' &&
      <div>Loading posts hang tight!</div>}
      {status === 'error' &&
      <p>An error occured while fetching data.</p>}
      { status === 'data' &&
      <div>
        <h2 className="heading">Posts</h2>
        {posts.length > 0 ?
          posts.map((post) => (
            <Post
            key={`${postCounter}${post.id}`}
            id={post.id}
            post={post}
            updatePost={setPostCounter}
            posts={posts}
            setPosts={setPosts}
            />
          )) :
          <p>No posts on this site yet.</p>
        }
      </div>
      }
    </main>
    <footer>
      <p>Scribbly 2025 by Stephen Asembo.</p>
    </footer>
    </div>
  )
}