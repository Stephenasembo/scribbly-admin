import { useState } from "react";
import Button from "./Button";
import CommentForm from "./CommentForm";
import { useAuthContext } from "./context/AuthContext";

export default function Comment({comment, id, pageUpdated, updatePage}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [content, setContent] = useState(comment.content)

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem('jwt');

  const { currentUser } = useAuthContext();

  async function deleteComment() {
    const url = `${baseUrl}admin/comments/${id}`
    let response = await fetch(url, {
      mode: 'cors',
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
    })
    if (response.status === 204) {
      updatePage(!pageUpdated);
      return console.log('Comment deleted')
    }
    console.log('An error occurred on deleting comment.')
  }

  function toggleComment() {
    setIsUpdating(true);
  }

  function cancelComment(e) {
    e.preventDefault()
    setIsUpdating(false);
  }


  async function updateComment(e) {
    e.preventDefault()
    const url = `${baseUrl}app/comments/${id}`;
    let response = await fetch(url, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ content })
    })
    if (response.status === 200) {
      response = await response.json();
      const newContent = response.data.content;
      setIsUpdating(false);
      return setContent(newContent)
    }

    console.log('An error occured')
  }

  return (
    <div id={id}>
      {isUpdating ?
      <CommentForm
      value={content}
      setValue={setContent}
      cancelComment={cancelComment}
      commentBtnFunction={updateComment}
      btnText='Update comment'
      />:
      <div>
        <p>
          {content}
        </p>
        <p>
          <span>@ {comment.author} </span>
          <span>{(new Date(comment.createdAt)).toDateString()}</span>
        </p>
        <Button
        text='Delete comment'
        onClick={deleteComment}
        />
        {comment.userId === currentUser.id &&
          <Button
          text='Update comment'
          onClick={toggleComment}
        />
        }
      </div>
      }
    </div>
  )
}