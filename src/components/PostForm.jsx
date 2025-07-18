import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const [postData, setPostData] = useState({});
  const [status, setStatus] = useState('data');
  const navigate = useNavigate()

  async function submitPost() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const url = `${baseUrl}admin/post`;
    const token = localStorage.getItem('jwt');

    let response = await fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })

    if(response.status === 201) {
      return navigate('/app')
    }

    return setStatus('error');
  }

  function cancelPost(e) {
    e.preventDefault()
    setPostData({})
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

  return(
    <div>
      <h1>Create A Post</h1>
      <div>
        <form action="">
          <label htmlFor="title" style={{display: "block"}}>
            Title: 
            <Input
            type='text'
            name='title'
            id='title'
            placeholder='Enter post title here'
            data={postData}
            setData={setPostData}
            isrequired={true}
            />
          </label>
          <div>
            <h2>Post Content:</h2>
            <textarea
            style={{width: '90%'}}
            name="content"
            id="content"
            rows='25'
            required
            onChange={updateContent}
            >
            </textarea>
          </div>
          <p>
            <Button
              text='Cancel'
              onClick={cancelPost}
            />
            <Button
              text='Create Post'
              onClick={createPost}
            />
          </p>
        </form>
      </div>
    </div>
) 
}