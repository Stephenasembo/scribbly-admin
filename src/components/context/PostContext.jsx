 import { createContext, useContext } from 'react';

export const PostContext = createContext({savedPost: {}, setSavedPost: () => {}});

export function usePostContext() {
  return useContext(PostContext)
}

