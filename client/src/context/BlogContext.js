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
  const [user, setUser] = useState()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  // const { currentUser } = useAuth()
  // const uid = currentUser.uid

  //get the user info of the logged in user
  const getUserInfo = (uid) => {
    setLoading(true)
    axios.get(`/api/user/${uid}`)
      .then((results) => {
        setUser(results.data)
      })
      .catch((err) => {
        console.error(err)
      })
    setLoading(false);
  }

  // gets all the posts
  const getPosts = () => {
    setLoading(true)
    axios.get(`/api/all_posts`)
      .then((results) => {
        setPosts(results.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
      })
      .catch((err) => {
        console.error(err)
      })
    setLoading(false)
  }

  //values to passed down from context
  const value = {
    getUserInfo,
    user,
    getPosts,
    posts,
  }

  return (
    <BlogContext.Provider value={value}>
      {!loading && children}
    </BlogContext.Provider>
  )
}