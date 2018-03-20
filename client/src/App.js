//Lillian
import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import './App.css';

import Login from './Login'
import SignUp from './signup'
import Feed from './Feed'
import Userpage from './Userpage'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/feed' component={Feed} />
          <Route path='/post/:id' component={} />
          <Route path='/:username' component={Userpage} />
          <Route path='/favs' component={Likes} />
          <Route path='/following', component={Following} />
          <Route path='/myposts', component={MyPosts} />
        </div>
      </Router>
    )
  }
}

export default App;
