import React, { useRef, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Signup from './Signup.jsx';
import { useAuth } from '../../context/AuthContext.js';
import { useBlogContext } from '../../context/BlogContext.js';

const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login } = useAuth();
  const [error, setError] = useState('');
  const history = useHistory();

  const onClick = async (e) => {
    e.preventDefault();

    if (!emailRef.current.value || !passwordRef.current.value) {
      return setError('All fields required!');
    } else {
      try {
        setError('');
        await login(emailRef.current.value, passwordRef.current.value);
        history.push('/')
      } catch {
        setError('Failed to sign in!');
      }
    }
  }

  if (currentUser && currentUser.uid) {
    return <Redirect to="/posts" />
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
        <button onClick={onClick}>Login</button>
        <div className="link-left" ><Link className='link-no-underline' to='/forgot_password'>Forgot Password?</Link> </div>
        <div className="link-right" >Need an account? <Link className='link-no-underline' to='/signup' >Signup</Link> </div>
      </form>
    </div>
  )

}

export default Login;