import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.js'
import { useBlogContext } from '../../context/BlogContext.js'
import PostsList from '../lists/PostsList.jsx'
import News from '../lists/News.jsx'

const Landing = () => {
  const { currentUser } = useAuth();
  const { posts, getPosts } = useBlogContext();
  const history = useHistory();

  //map out each post in the postpreview component
  return (
    <div className='feed'>
      <PostsList />
      <News />
    </div>
  )
}
export default Landing;