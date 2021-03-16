import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { useBlogContext } from '../../context/BlogContext.js';
import axios from 'axios'
import Moment from 'react-moment'

const Post = (props) => {
  const { currentUser } = useAuth()
  const { posts, getPosts } = useBlogContext()
  const history = useHistory();
  const [post, setPost] = useState('')
  const [firebaseId, setFirebaseId] = useState('')

  //function to delete post
  const deletePost = (e) => {
    e.preventDefault()
    axios.delete(`api/delete/${post._id}`)
      .then((results) => {
        alert('Post successfully deleted!')
        history.push('/')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setPost(props.location.postProps)
    setFirebaseId(props.location.postProps.user.firebaseId)
  }, [])

  //check to see if the current user that is logged in is the owner of the particular post, if user is the owner of the post then update post and delete post buttons are available
  if (currentUser && currentUser.uid === firebaseId) {
    return(
      <div className='singlePostContainer'>
        <div className='user'>
          <img src={post.user.pic} />
          <h3>{post.user.name}</h3>
        </div>
          <div className='postInfo'>
            <h1>{post.title}</h1>
            <Moment fromNow>{post.date}</Moment>
            <p style={{whiteSpace: "pre-wrap"}}>{post.body}</p>
            <Link to={{
              pathname: `/${post._id}`,
              propsId: post._id
              }}>
            <button className='updateButton'>Update Post</button>
            </Link>
            <button className='updateButton' onClick={deletePost}>Delete Post</button>
          </div>
      </div>
    )
  } else {
    //else if user doesn't own the post, the regular view of the single post is rendered
    return (
      <div className='singlePostContainer'>
        <div className='user'>
          <img src={post.user.pic} />
          <h3>{post.user.name}</h3>
        </div>
        <div>
          <div className='postInfo'>
            <h1>{post.title}</h1>
            <Moment fromNow>{post.date}</Moment>
            <p style={{whiteSpace: "pre-wrap"}}>{post.body}</p>
          </div>
        </div>
      </div>
    )
  }

}

export default Post