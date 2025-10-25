import { useNavigate, Link } from "react-router-dom"
import Input from "./Input"
import Button from "./Button"
import styles from "../styles/Form.module.css"
import { useState } from "react"
import { useAuthContext } from "./context/AuthContext";

export default function SignupForm() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const {setCurrentUser} = useAuthContext();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const url = `${baseUrl}auth/admin/signup`

  async function sendData() {
    let response = await fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (response.status !== 200) {
      let errorData = await response.json();
      return console.log(errorData);
    }

    response = await response.json();
    const user = response.user;
    const jwt = response.token;
    localStorage.setItem('scribbly_admin_jwt', `Bearer ${jwt}`);
    setCurrentUser(user);
    return navigate('/app')
  };

  function submitForm(e) {
    e.preventDefault();
    sendData();
    setFormData({});
  }

  return (
    <div>
      <h1>Create An Account</h1>
      <p>Fields marked with an asterisk(*) are required.</p>
      <form action="/"></form>
        <label htmlFor="username">
          Username(*): 
          <Input
          key='username'
          type="text"
          name="username"
          id="username"
          placeholder="John Doe"
          isrequired={true}
          data={formData}
          setData={setFormData}
          />
        </label>
        <label htmlFor="email">
          Email(*): 
          <Input
          key='email'
          type="text"
          name="email"
          id="email"
          placeholder="you@example.com"
          isrequired={true}
          data={formData}
          setData={setFormData}
          />
        </label>
        <label htmlFor="password">
          Password(*): 
          <Input
          key='password'
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          isrequired={true}
          data={formData}
          setData={setFormData}
          />
        </label>
        <label htmlFor="secretCode">
          Secret Code(*): 
          <Input
          key='secretCode'
          type="text"
          name="secretCode"
          id="secretCode"
          placeholder="Enter the secret code"
          isrequired={true}
          data={formData}
          setData={setFormData}
          />
        </label>
        <Button
        className={styles.btn}
        text='Sign up'
        onClick={submitForm}
        />
    </div>
  )
}