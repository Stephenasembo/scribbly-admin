import { createContext, useContext } from "react";

export const AuthContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
})

export function useAuthContext() {
  return useContext(AuthContext);
};