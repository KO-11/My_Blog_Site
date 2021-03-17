import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { useBlogContext } from '../../context/BlogContext.js'
import Fade from 'react-reveal/Fade';
import axios from 'axios';
import PostPreview from '../lists/PostPreview.jsx'

const MyPosts = () => {
  const { currentUser } = useAuth();
  const { posts, setPosts } = useBlogContext();
  const history = useHistory();

  //gets all posts in the database anyone has access to see all posts
  // useEffect(() => {
    // axios.get('/api/all_posts')
    //   .then((results) => {
    //     setPosts(results.data)
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   })
  // }, [])

  //returns just posts from the user
  if(!currentUser) {
    console.log('no user')
    return (
      <Redirect to='/login' />
    )
  }

  console.log(posts, 'posts from my page')
  console.log(currentUser.uid, 'uid')
  return (
      <div className='myPosts'>
        {posts.map((post) => {
          console.log(currentUser.uid, post.user.firebaseId)
          if(currentUser && currentUser.uid === post.user.firebaseId) {
            return (
              <PostPreview post={post} key={post._id} />
            )
          }
        })}
      </div>
  )

}

export default MyPosts