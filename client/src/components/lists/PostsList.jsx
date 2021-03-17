import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { useBlogContext } from '../../context/BlogContext.js';
import Fade from 'react-reveal/Fade';
import axios from 'axios';
import PostPreview from '../lists/PostPreview.jsx'

const PostsList = (props) => {
  const { currentUser } = useAuth();
  const { posts, getPosts } = useBlogContext();
  const history = useHistory();
  // const [posts, setPosts] = useState([]);

    //gets all posts in the database everyone has access to see all posts
    useEffect(() => {
      getPosts()
    }, [])
  //gets all posts in the database anyone has access to see all posts
  // useEffect(() => {
  //   axios.get('/api/all_posts')
  //     .then((results) => {
  //       setPosts(results.data)
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     })
  // }, [])

  //maps through all the posts of the user and displays with postpreview component
  console.log(posts, 'postslist')
  return (
    <div className='postsList'>
      {posts.map((post) => {
        return (
          <PostPreview post={post} key={post._id} />
        )
      })}
    </div>
  )

}

export default PostsList;