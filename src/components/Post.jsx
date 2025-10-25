import { Link } from "react-router-dom"
import Button from "./Button"
import { usePostContext } from "./context/PostContext";
import PostForm from "./PostForm";
import { useState } from "react";

export default function Post({post, updatePost, id, posts, setPosts, setPageUpdated}) {
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const {savedPost, setSavedPost} = usePostContext()
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem('scribbly_admin_jwt')

  async function togglePublishStatus() {
    const url = `${baseUrl}admin/posts/${post.id}`;
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

  async function deletePost() {
    const newPosts = posts.filter((post) => post.id !== id);
    const url = `${baseUrl}admin/posts/${id}`;
    let response = await fetch(url, {
      mode: 'cors',
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
    });
    if (response.status !== 204) {
      return console.log('Error on deleting post.');
    }
    setPosts(newPosts);
  }

  async function updatePostContent() {
    setSavedPost(() => post);
    setUpdateBtnClicked(true);
  }

  return(
    <div>
      {updateBtnClicked ?
        <PostForm
        savedPost={savedPost}
        setFormOpen={setUpdateBtnClicked}
        setPageUpdated={setPageUpdated}
        /> :
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
            <Button
            text='Delete Post'
            onClick={deletePost}
            />
            <Button
            text='Update Post'
            onClick={updatePostContent}
            />
          </p>
        </section>
      </div>
      }
    </div>
  )
}