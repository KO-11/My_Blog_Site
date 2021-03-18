import React, { useRef, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import Signup from './Signup.jsx'
import { useAuth } from '../../context/AuthContext.js'

const Login = () => {

  const emailRef = useRef()
  const passwordRef = useRef()
  const { currentUser, login } = useAuth()
  const [error, setError] = useState('')
  const history = useHistory()

  const handleLogin = async (e) => {
    e.preventDefault()

    //makes sure both fields have inputs
    if (!emailRef.current.value || !passwordRef.current.value) {
      return setError('All fields required!')
    } else {
      try {
        setError('')
        //attempt to login with user's inputs
        await login(emailRef.current.value, passwordRef.current.value)
        history.push('/')
      } catch {
        setError('Failed to sign in!')
      }
    }
  }

  return (
    <div>
      {error && alert(error)}
      <form className="login">
        <h1>Login</h1>
        <label>
          Email:
          <input type='email' ref={emailRef} />
        </label>
        <label>
          Password:
          <input type='password' ref={passwordRef} />
        </label>
        <button onClick={handleLogin}>Login</button>
        <div className="link-left" ><Link className='link-no-underline' to='/forgot_password'>Forgot Password?</Link> </div>
        <div className="link-right" >Need an account? <Link className='link-no-underline' to='/signup' >Signup</Link> </div>
      </form>
    </div>
  )

}

export default Login