import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Comment from "./Comment";
import Button from "./Button";
import CommentForm from "./CommentForm";

export default function PostPage() {
  const [post, setPost] = useState({})
  const [comment, setComment] = useState('')
  const [isWriting, setIsWriting] = useState(false)
  const { postId } = useParams();
  const [commentStatus, setCommentStatus] = useState('');
  const [postUpdated, setPostUpdated] = useState(false);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const url = `${baseUrl}app/posts/${postId}`
    const token = localStorage.getItem('jwt');

    async function fetchPost() {
      let response = await fetch(url, {
        mode: 'cors',
        headers: {
          'Authorization': token
        }
      });
      if(response.status === 200) {
        response = await response.json();
        setPost(response.data);
      } else {
        console.log('An error occured.')
      }
    }

    fetchPost()
  }, [postId, commentStatus, postUpdated])

  function toggleComment() {
    setIsWriting(true)
  }

  function cancelComment() {
    setIsWriting(false);
    setComment('');
  }

  function submitComment(e) {
    e.preventDefault();
    createComment();
    setComment('');
    setIsWriting(false);
  }

  async function createComment() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('jwt');
    const url = `${baseUrl}app/posts/${postId}/comments`;
    let response = await fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({content: comment})
    })
    if(response.status === 200) {
      return setCommentStatus('data');
    }
    setCommentStatus('error')
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>
        <span>{post.author} </span>
        <span>
          {(new Date(post.publishedAt)).toDateString()}
        </span>
      </p>
      <div>
        <p>
          {post.content}
        </p>
        <div>
          {
            post.comments &&
            post.comments.length > 0 ?
            post.comments.map((comment) => (
              <Comment
              key={comment.id}
              id={comment.id}
              comment={comment}
              pageUpdated={postUpdated}
              updatePage={setPostUpdated}
              />
            )):
            <p>
              No comments yet. Be the first to comment.
            </p>
          }
          {commentStatus === 'error' &&
          <p>Ooops an error occured while creating your comment</p>
          }
          {isWriting ?
          <CommentForm
          value={comment}
          setValue={setComment}
          cancelComment={cancelComment}
          submitComment={(e) => submitComment(e)}
          /> :
          <Button text='Comment' onClick={toggleComment} />
          }
        </div>
      </div>
    </div>
  )
}