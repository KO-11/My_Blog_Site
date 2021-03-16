import React, {useContext, useState, useEffect } from 'react'
import { auth } from '../config/firebase.js'

//create auth context
const AuthContext = React.createContext()

//creat function to use auth context
export function useAuth() {
  return useContext(AuthContext)
}

//create auth provider that will provide functionality to add/edit/delete posts for blog
export function AuthProvider({ children }) {
  //create state for current user
  //set loading initially to true
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  //utilize firebase for creating email and password
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  //utilize firebase for logging in
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  //utilize firebase for logging out
  function logout() {
    return auth.signOut()
  }
  //utilize firebase to reset a password
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }
  //utilize firebase to update email
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }
  //utilize firebase to update password
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
  //use firebase to notify when user gets set - only run onauthstatechanged once
  //set loading to false once we have a user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  //signup and currentUser value of auth
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  //ensures user is set before rendering
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}