import Button from "./Button";

export default function Comment({comment, id, pageUpdated, updatePage}) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem('jwt');

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

  return (
    <div id={id}>
      <p>
        <span>{comment.userId}</span>
        <span>{(new Date(comment.createdAt)).toDateString()}</span>
      </p>
      <p>
        {comment.content}
      </p>
      <Button
      text='Delete comment'
      onClick={deleteComment}
      />
    </div>
  )
}