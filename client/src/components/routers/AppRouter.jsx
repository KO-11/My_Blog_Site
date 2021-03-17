import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import Navbar from '../navbar/Navbar.jsx';
import News from '../lists/News.jsx';
import Signup from '../auth/Signup.jsx';
import Login from '../auth/Login.jsx';
import ForgotPassword from '../auth/ForgotPassword.jsx';
import PostsList from '../lists/PostsList.jsx';
import PostPreview from '../lists/PostPreview.jsx'
import Post from '../lists/Post.jsx';
import LandingPage from '../landing/LandingPage.jsx'
import AddPost from '../forms/AddPost.jsx'
import UpdatePost from '../forms/UpdatePost.jsx'
import MyProfile from '../forms/MyProfile.jsx'
import MyPosts from '../lists/Myposts.jsx'

const AppRouter = () => {
  return (
    <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot_password" component={ForgotPassword} />
            <Route path="/my_posts" component={MyPosts} />
            <Route path='/post/:id' component={Post} />
            <PrivateRoute path='/add_post' component={AddPost} />
            <PrivateRoute path='/update_post/:id' component={UpdatePost} />
            <PrivateRoute path='/my_profile' component={MyProfile} />
          </Switch>
    </Router>
  )
}

export default AppRouter;