import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.js'
import { useBlogContext } from '../../context/BlogContext.js'
import PostPreview from '../lists/PostPreview.jsx'

const PostsList = (props) => {
  const { currentUser } = useAuth()
  const { posts, getPosts } = useBlogContext()

  //gets all posts in the database everyone has access to see all posts
  useEffect(() => {
    getPosts()
  }, [])

  //maps through all the posts of the user and displays with postpreview component
  //in the map function it passes the specific post object to the post component via the prop 'post'
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

export default PostsList