import React, { useRef, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Signup from './Signup.jsx'
import { useAuth } from '../../context/AuthContext.js'

const ForgotPassword = () => {

  const emailRef = useRef()
  const { currentUser, resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  //submits the form to reset password
  const handleReset = async (e) => {
    e.preventDefault();
    //ensures email input is filled
    if (!emailRef.current.value) {
      return setError('Email required!');
    } else {
      try {
        setError('');
        //runs resetpassword function to send email to user
        await resetPassword(emailRef.current.value);
        setMessage('Check your inbox for instructions')
      } catch {
        setError('Failed to reset password!');
      }
    }
  }

  if (currentUser && currentUser.uid) {
    return <Redirect to="/" />
  }

  return (
    <div>
      {error && alert(error)}
      {message && alert(message)}
      <form className="forgot-password">
        <h1>Password Reset</h1>
        <label>
          Email:
          <input type='email' ref={emailRef} />
        </label>
        <button onClick={handleReset}>Reset</button>
        <div className="link-left" >Remember Password? <Link className='link-no-underline' to='/login'>Login</Link> </div>
        <div className="link-right" >Need an account? <Link className='link-no-underline' to='/signup' >Signup</Link> </div>
      </form>
    </div>
  )

}

export default ForgotPassword