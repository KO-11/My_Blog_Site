import React from 'react';
import { AuthProvider } from '../context/AuthContext.js';
import { BlogContextProvider } from '../context/BlogContext.js';
import AppRouter from './routers/AppRouter.jsx';

//main component wrap all compenents within authcontext and blogcontext
const App = () => {
  return (
    <AuthProvider>
      <BlogContextProvider>
        <AppRouter />
      </BlogContextProvider>
    </AuthProvider>
  )
}

export default App;