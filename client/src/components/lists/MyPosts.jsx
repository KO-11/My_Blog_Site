import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import Fade from 'react-reveal/Fade';
import axios from 'axios';
import PostPreview from '../lists/PostPreview.jsx'

const MyPosts = (props) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  //gets all posts in the database anyone has access to see all posts
  useEffect(() => {
    axios.get('/api/all_posts')
      .then((results) => {
        setPosts(results.data)
      })
      .catch((err) => {
        console.error(err);
      })
  }, [])

  //returns just posts from the user
  return (
      <div className='posts'>
        {posts.map((post) => {
          console.log(post)
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