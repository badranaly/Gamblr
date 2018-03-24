//Lillian
import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import './App.css';
import axios from 'axios'
import Userform from './Userform'
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
import TokenService from './services/TokenService'
import createHistory from 'history/createBrowserHistory'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false,
      user_name: '',
      fireRedirect: true,

    }
  }

  // api call for creating a new user
// note that TokenService.save with the token is called
// may also want to setState with the user data and
// whether or not the user is logged in

register(data) {
  axios('http://localhost:3000/api/users/', {
    method: "POST",
    data
  }).then(resp => {
    TokenService.save(resp.data.token)
  })
  .catch(err => console.log(`err: ${err}`));
}

// same as above except route is login
// as above, we are saving the token locally using
// the TokenService

logout() {
    TokenService.destroy();
    console.log('this is tokenservice of logout', TokenService)
}


render(){
    return (
      <Router>
        <div className="App">
          <a href='/login'><button onClick={this.logout.bind(this)}>Logout</button></a>
          <Route exact path='/' component={Feed} />
          <Route exact path='/login' component={() => {
            return <Userform check={this.state.isLoggedIn} user={this.state.user_name} />
          }} />
          <Route exact path='/signup' component={SignUp} user={this.state.isLoggedIn} />
          <Route path='/feed' component={Feed} />
          <Route path='/followers' component={Followers} />
            <Route path='/user/:username' component={Userpage} />
            <Route path='/addPost' component={PostAddForm} />
            <Route path='/favs' component={Likes} />
            <Route path='/following' component={Following} />
            <Route path='/settings' component={Settings} />
            <Route path='/Appearance' component={Appearance} />
            <Route path='/myPosts' component={MyPosts} />
          <div>

          </div>
        </div>
      </Router>
    )
  }
}

export default App;
