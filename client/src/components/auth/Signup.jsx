
import React, { useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Login from './Login.jsx';
import { useAuth } from '../../context/AuthContext.js';
import axios from 'axios'

const Signup = () => {

  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const { currentUser, signup } = useAuth()
  const [error, setError] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    //must meet email and password requirements before request is sent to firebase
    if (!emailRef.current.value || !passwordRef.current.value || !confirmPasswordRef.current.value) {
      return setError('All fields required!')
    } else if (passwordRef.current.value.length < 7) {
      return setError('Password must have at least 7 characters!')
    } else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match')
    } else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailRef.current.value))) {
      return setError('Invalid email!')
    } else {
      try {
        setError('')
        //await response from firebase and then create the user with the firebaseId into the mongo database setting the initial name and photo to anonymous
        const response = await signup(emailRef.current.value, passwordRef.current.value)
        await axios.post('/api/add_user', {firebaseId: response.user.uid, email: response.user.email, name: 'anonymous', pic: 'https://firebasestorage.googleapis.com/v0/b/auth-development-35735.appspot.com/o/images%2Fanonymous.png?alt=media&token=2dfab25e-3a7e-42c2-90c1-7daed66ad457', posts: []})
      } catch (err) {
        console.error(err)
        setError(err)
      }
    }

  }

  return (
    <div>
      {error && alert(error)}
      <form className="signup">
        <h1>Signup</h1>
        <label>
          Email:
          <input type='email' ref={emailRef} />
        </label>
        <label>
          Password:
          <input type='password' ref={passwordRef} />
        </label>
        <label>
          Confirm Password:
          <input type='password' ref={confirmPasswordRef} />
        </label>
        <button onClick={handleSignup}>Signup</button>
        <div className="link-left">Have an account? <Link className='link-no-underline' to='/login' >Login</Link> </div>
      </form>
    </div>
  )

}

export default Signup