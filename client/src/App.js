//Lillian
import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import './App.css';
import './Chris.css'

import Login from './Login'
import SignUp from './Signup'
import Feed from './Feed'
import Likes from './Likes'
import Userpage from './Userpage'
import Following from './Following'
import PostAddForm from './PostAddForm'
import Followers from './Followers'
import Settings from './Settings'
import Appearance from './Appearance'
import MyPosts from './MyPosts'
import SinglePost from './SinglePost'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/feed' component={Feed} />
          <Route path='/followers' component={Followers} />
          {/*<Route path='/post/:id' component={} />*/}
          <Route path='/user/:username' component={Userpage} />
          <Route path='/addPost' component={PostAddForm} />
          <Route path='/favs' component={Likes} />
          <Route path='/following' component={Following} />
          <Route path='/settings' component={Settings} />
          <Route path='/Appearance' component={Appearance} />
          <Route path='/myPosts' component={MyPosts} />
          <Route path='/post/:id' component={SinglePost} />
        </div>
      </Router>
    )
  }
}

export default App;
