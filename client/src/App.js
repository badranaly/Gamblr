//Lillian
import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import axios from 'axios'
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
import TokenService from './services/TokenService'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false
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
login(data) {
  axios('http://localhost:3000/api/users/login', {
    method: "POST",
    data
  }).then(resp => {
    TokenService.save(resp.data.token);
  })
  .catch(err => console.log(`err: ${err}`));
}

logout(ev) {
    ev.preventDefault();
    TokenService.destroy();
}

checkLogin() {
  axios('http://localhost:3000/isLoggedIn', {
    headers: {
      Authorization: `Bearer ${TokenService.read()}`,
    },
  }).then(resp => {
    console.log('this is the response --> ',resp)
      this.setState({
      isLoggedIn: resp.data.isLoggedIn
    })
  })
  .catch(err => console.log(err));
}

checkDecode(){
  axios('http://localhost:3000/decodeToken', {
    headers: {
      Authorization: `Bearer ${TokenService.read()}`
    },
  }).then(resp => {
    console.log('resp of decode ---> ', resp.data.token.username)
  })
  .catch(err => console.log(err))
}

  render() {
    return (
      <Router>
        <div className="App">
          <button onClick={this.checkLogin.bind(this)}>checkLogin</button>
          <button onClick={this.checkDecode.bind(this)}>decodeToken</button>
           {/* ? console.log('fuck ya') : console.log('fuck no')} */}
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={(props) => (
            <Login {...props} loggingout={this.logout.bind(this)} submit={this.login.bind(this)} />
          )} />
          <Route exact path='/signup' component={(props) => (
            <SignUp {...props} submit={this.register.bind(this)} />
          )} />
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
        </div>
      </Router>
    )
  }
}

export default App;
