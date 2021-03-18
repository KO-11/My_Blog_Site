import React, { useContext, useEffect, useState, useRef } from 'react';
import { useAuth } from './AuthContext.js';
import axios from 'axios';

//create context for the properties of the logged in blogger
const BlogContext = React.createContext()

export const useBlogContext = () => {
  return useContext(BlogContext);
}

//create context provider
export const BlogContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  // gets all the posts
  const getPosts = () => {
    setLoading(true)
    axios.get(`/api/all_posts`)
      .then((results) => {
        setPosts(results.data)
      })
      .catch((err) => {
        console.error(err)
      })
    setLoading(false)
  }

  //values to be passed down from context
  const value = {
    getPosts,
    posts,
  }

  return (
    <BlogContext.Provider value={value}>
      {!loading && children}
    </BlogContext.Provider>
  )
}