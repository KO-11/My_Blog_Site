import React from 'react'
import { useAuth } from '../../context/AuthContext.js'
import { useBlogContext } from '../../context/BlogContext'
import PostPreview from '../lists/PostPreview.jsx'

const MyPosts = () => {
  const { currentUser } = useAuth();
  const { posts, setPosts } = useBlogContext();

  //returns all posts that the user owns
  return (
      <div className='myPosts'>
        {posts.map((post) => {
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