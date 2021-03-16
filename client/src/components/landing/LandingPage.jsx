import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { useBlogContext } from '../../context/BlogContext.js';
import Fade from 'react-reveal/Fade';
import axios from 'axios';
import PostPreview from '../lists/PostPreview.jsx'
import PostsList from '../lists/PostsList.jsx'
import News from '../lists/News.jsx'

const Landing = (props) => {
  const { currentUser } = useAuth();
  const { posts, getPosts } = useBlogContext();
  const history = useHistory();
  // const [posts, setPosts] = useState([]);

  //gets all posts in the database everyone has access to see all posts
  useEffect(() => {
    getPosts()
  }, [])

  //map out each post in the postpreview component
  return (
    <div className='feed'>
      <PostsList posts={posts} />
      <News />
    </div>
  )
}
export default Landing;