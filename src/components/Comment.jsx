export default function Comment({comment}) {
  return (
    <div>
      <p>
        <span>{comment.userId}</span>
        <span>{(new Date(comment.createdAt)).toDateString()}</span>
      </p>
      <p>
        {comment.content}
      </p>
    </div>
  )
}