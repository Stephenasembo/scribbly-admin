import { useEffect, useState } from "react";
import Post from "./Post";
import { Link, useNavigate } from "react-router-dom"
import Button from "./Button";
import { useAuthContext } from "./context/AuthContext";
import styles from '../styles/Homepage.module.css'

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [postCounter, setPostCounter] = useState(0);
  const [pageUpdated, setPageUpdated] = useState(false);
  const navigate = useNavigate();

  const {currentUser} = useAuthContext();

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const url = `${baseUrl}admin/posts`;

    async function fetchPosts() {
      const token = localStorage.getItem('scribbly_admin_jwt');
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
  }, [postCounter, pageUpdated])

  return(
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link to='/' className={styles.navLink}>Home</Link>
        <Button 
        text='Logout'
        className={styles.logoutBtn}
        onClick={() => {
          localStorage.removeItem('scribbly_admin_jwt');
          navigate('/')
        }}
        />
      </nav>
      <header>
        <h1>Welcome back {currentUser.username}, to Scribbly.</h1>
        <div className={styles.hero}>
          <p>
            Explore thoughts, stories and ideas from seasoned writers.
          </p>
          <p>
            <Button
            text='Create Post'
            onClick={() => navigate('/post-form')}
            />
          </p>
        </div>
      </header>
      <main>
        {status === 'loading' &&
        <div className={styles.spinner}></div>}
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
              pageUpdated={pageUpdated}
              setPageUpdated={setPageUpdated}
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