import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function PostForm({
  savedPost = null, setFormOpen = null, setPageUpdated = null
}) {
  const [postData, setPostData] = useState({content: ''});
  const [status, setStatus] = useState('data');
  const [initialPost, setInitialPost] = useState(savedPost);

  const navigate = useNavigate()

  async function submitPost(isToBeUpdated = false) {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    let url = `${baseUrl}admin/post`;
    const token = localStorage.getItem('scribbly_admin_jwt');
    let method = 'POST';
    let formData = postData;

    if(isToBeUpdated) {
      url = `${baseUrl}admin/posts/${initialPost.id}`;
      method = 'PUT';
      formData = initialPost;
    }

    let response = await fetch(url, {
      mode: 'cors',
      method: method,
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if(response.status === 201) {
      return setStatus('data')
    }

    return setStatus('error');
  }

  function cancelPost(e) {
    e.preventDefault()
    setPostData({})
    setInitialPost({})
    if (initialPost) {
      return setFormOpen(false)
    }
    return navigate('/app')
  }

  function createPost(e) {
    e.preventDefault();
    setStatus('loading')
    submitPost();
    if(status === 'data') {
      return navigate(-1)
    }
  }

  function updateContent(e) {
    const newValue = e.target.value;
    setPostData((prevData) => ({
      ...prevData, content: newValue
    }))
  }

  function updateInitialContent(e) {
    const newValue = e.target.value;
    setInitialPost((prevData) => ({
      ...prevData, content: newValue
    }))
  }

  function updatePost(e) {
    e.preventDefault();
    submitPost(true);
    setFormOpen(false);
    setPageUpdated((prev) => !prev)
  }

  return(
    <div>
      {savedPost ? 
      <h2>Update Post</h2> :
      <h1>Create A Post</h1>
      }
      <div>
        <form action="">
          <label htmlFor="title" style={{display: "block"}}>
            Title: 
            <Input
            type='text'
            name='title'
            id='title'
            placeholder='Enter post title here'
            data={savedPost ? initialPost : postData}
            setData={savedPost? setInitialPost : setPostData}
            isrequired={true}
            />
          </label>
          <div>
          {savedPost ? 
          <h3>Post Content: </h3> :
          <h2>Post Content: </h2>
          }
            <textarea
            style={{width: '90%'}}
            name="content"
            id="content"
            rows='25'
            value={initialPost ? initialPost.content : postData.content}
            required
            onChange={savedPost ? updateInitialContent : updateContent}
            >
            </textarea>
          </div>
          <p>
            <Button
              text='Cancel'
              onClick={cancelPost}
            />
            <Button
              text={initialPost ? 'Update Post' : 'Create Post'}
              onClick={initialPost ? updatePost : createPost}
            />
          </p>
        </form>
      </div>
    </div>
) 
}