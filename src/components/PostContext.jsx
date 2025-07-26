import { useState } from "react";
import { PostContext } from './context/PostContext'

export default function PostProvider({children}) {
  const [savedPost, setSavedPost] = useState({});

  return (
    <PostContext.Provider value={{savedPost, setSavedPost}}>
      {children}
    </PostContext.Provider>
  )
}