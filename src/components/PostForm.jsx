import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const [postData, setPostData] = useState({});
  const navigate = useNavigate()

  function cancelPost() {
    return navigate(-1)
  }

  function createPost() {
    return navigate(-1)
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