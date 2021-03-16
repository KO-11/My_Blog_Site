import React, { useRef, useState } from 'react';
import { useBlogContext } from '../../context/BlogContext.js';
import { useAuth } from '../../context/AuthContext.js';
import { Link, Redirect, useHistory } from 'react-router-dom';
// import Modal from 'react-modal';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  const goHome = (props) => {
    history.push('/')
  }

  //function tied to the logout button to log user out of their account
  const onClick = async () => {
    try {
      setError('');
      setLoading(true);
      await logout();
    } catch {
      setError('Failed to logout');
    }
    setLoading(false);
  }

  //navbar for users who are not signed in, offers a home link and a login link, if user doesn't have an account they can click login and at the login screen there is a button to signup
  if (!currentUser) {
    return (
      <div className='header'>
        <div className='title'>
          <div >Justablog Blog</div>
        </div>
        <div className='navbar'>
          <div className='nav-left'>
            <Link to='/' className='navLink'>Home</Link>
            <Link to='/login' className='navLink'>My Posts</Link>
            <Link to='/login' className='navLink'>Update Profile</Link>
            <Link to='/login' className='navLink'> Login </Link>
          </div>
          <div className='nav-right'>
            <Link to='/login' className='addPostLink'>Add Post</Link>
          </div>
        </div>
      </div>
    )
  }

  //navbar for logged in user offers home where user can see all posts, my posts where the user can see just their posts, add post where user can add a new post, and logout
  return (
    <div className='header'>
    <div className='title'>
      <div >Justablog Blog</div>
    </div>
    <div className='navbar'>
      <div className='nav-left'>
        <Link to='/' className='navLink'>Home</Link>
        <Link to='/my_posts' className='navLink'>My Posts</Link>
        <Link to='my_profile' className='navLink'>Update Profile</Link>
        <Link to='/' className='navLink' onClick={onClick}> Logout </Link>
      </div>
      <div className='nav-right'>
        <Link to='/add_post' className='addPostLink'>Add Post</Link>
      </div>
    </div>
  </div>
  )
}

export default Navbar;