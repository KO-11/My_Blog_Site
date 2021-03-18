import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import axios from 'axios'
import Moment from 'react-moment'

//props is passed from PreviewPost
const Post = (props) => {
  const { currentUser } = useAuth()
  const history = useHistory()

  //function to delete post
  const deletePost = (e) => {
    e.preventDefault()
    axios.delete(`/api/delete/${props.location.state.postState._id}`)
      .then((results) => {
        alert('Post successfully deleted!')
        history.push('/')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  //check to see if the current user that is logged in is the owner of the particular post, if user is the owner of the post then update post and delete post buttons are available
  //the user is a property on the post that is passed down from the PreviewPost component
  if (currentUser && currentUser.uid === props.location.state.postState.user.firebaseId) {
    return(
      <div className='singlePostContainer'>
        <div className='user'>
          <img src={props.location.state.postState.user.pic} />
          <h3>{props.location.state.postState.user.name}</h3>
        </div>
          <div className='postInfo'>
            <h1>{props.location.state.postState.title}</h1>
            <Moment fromNow>{props.location.state.postState.date}</Moment>
            <p style={{whiteSpace: "pre-wrap"}}>{props.location.state.postState.body}</p>
            <Link to={{
              //stateId passed is the posts mongo id
              pathname: `/update_post/${props.location.state.postState._id}`,
              stateId: props.location.state.postState._id
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
          <img src={props.location.state.postState.user.pic} />
          <h3>{props.location.state.postState.user.name}</h3>
        </div>
        <div>
          <div className='postInfo'>
            <h1>{props.location.state.postState.title}</h1>
            <Moment fromNow>{props.location.state.postState.date}</Moment>
            <p style={{whiteSpace: "pre-wrap"}}>{props.location.state.postState.body}</p>
          </div>
        </div>
      </div>
    )
  }

}

export default Post