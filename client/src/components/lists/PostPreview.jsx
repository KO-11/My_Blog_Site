import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { useAuth } from '../../context/AuthContext.js';
import { useBlogContext } from '../../context/BlogContext.js';


//component that displays a preview of the post and offers a link to view a specific post
//props received from postslist include the post object itself
const PostPreview = (props) => {
  const { currentUser } = useAuth();
  // const { posts, setUserId } = useBlogContext();

  console.log(props.post, 'post prop at preview')
  return (
    <div >
      <Link className='previewPostsContainer' to={{
        pathname: `/post/${props.post._id}`,
        state: {
          postProps: props.post,
          userProps: props.post.user
         }
        }}>
        <div className='postPreview'>
          <div className='userPreview'>
            <img src={props.post.user.pic} />
            <h3>{props.post.user.name}</h3>
          </div>
          <div className='postTitle'>
            <h1>{props.post.title}</h1>
            <Moment fromNow>{props.post.date}</Moment>
          </div>
        </div>
        <div className='contentPreview'>
          <p style={{whiteSpace: "pre-wrap"}}>{props.post.body}</p>
        </div>
      </Link>
    </div>
  )
}

export default PostPreview;
