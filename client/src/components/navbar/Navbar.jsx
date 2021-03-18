import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext.js'
import { Link, Redirect, useHistory } from 'react-router-dom'

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  //function tied to the logout button to log user out of their account
  const handleLogout = async () => {
    try {
      setError('')
      setLoading(true)
      await logout()
    } catch {
      setError('Failed to logout')
    }
    setLoading(false)
  }

  //navbar for users who are not signed in, besides the homepage every link redirects to the login screen
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

  //navbar for logged in user offers HOME where user can see all posts and the news, MY POSTS where the user can see just their posts, UPDATE PROFILE where the user can update their name and photo, ADD POST where user can add a new post, and logout
  return (
    <div className='header'>
    <div className='title'>
      <div >Justablog Blog</div>
    </div>
    <div className='navbar'>
      <div className='nav-left'>
        <Link to='/' className='navLink'>Home</Link>
        <Link to='/my_posts' className='navLink'>My Posts</Link>
        <Link to='/my_profile' className='navLink'>Update Profile</Link>
        <Link to='/' className='navLink' onClick={handleLogout}> Logout </Link>
      </div>
      <div className='nav-right'>
        <Link to='/add_post' className='addPostLink'>Add Post</Link>
      </div>
    </div>
  </div>
  )
}

export default Navbar