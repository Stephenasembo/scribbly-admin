import { useState, useEffect } from "react"
import { AuthContext } from "./context/AuthContext"

export function AuthComponent ({children}) {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const url = `${baseUrl}auth/user`
    async function fetchUser() {
      let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
      });
      if(response.status === 200) {
      response = await response.json();
      const user = response.user;
      return user;
      } else {
        return null;
      }
    }

    const token = localStorage.getItem('jwt');
    if(!token) {
      return;
    }

    fetchUser()
      .then((data) => {
        if(data) {
          setCurrentUser(data);
        }
      })
  }, [])

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  )
}