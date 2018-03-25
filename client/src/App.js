//Lillian
import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import './Chris.css'
import './index.css';
import Userform from './Userform'
// import {Redirect} from 'react-router-dom'
import './App.css';
// import axios from 'axios'
import SignupForm from './SignupForm'
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
// import TokenService from './services/TokenService'
// import services from './services/apiServices'
import Logout from './Logout'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false,
      user_name: '',
      fireRedirect: true,

    }
  }


render(){
    return (
      <Router>
        <div className="App">
          {/* <a href='/login'><button onClick={this.logout.bind(this)}>Logout</button></a> */}
          <Route exact path='/' component={Feed} />
          <Route exact path='/login' component={() => {
            return <Userform check={this.state.isLoggedIn} user={this.state.user_name} />
          }} />
          <Route exact path='/signup' component={() => {
            return <SignupForm check={this.state.isLoggedIn} />
          }}  />
          <Route exact path='/logout' component={Logout} />
          <Route path='/feed' component={Feed} />
          <Route path='/followers' component={() => {
            return <Followers check={this.state.isLoggedIn} user={this.state.user_name}/>
          }} />
          {/********
            everything above is complete with token auth
            ********/}

            <Route path='/user/:username' component={() => {
              return <Userpage check={this.state.isLoggedIn} user={this.state.user_name} />
            }} />
            <Route path='/addPost' component={() => {
              return <PostAddForm check={this.state.isLoggedIn} user={this.state.user_name} />
            }} />
            <Route path='/favs' component={() => {
              return <Likes check={this.state.isLoggedIn} user={this.state.user_name} />
            }} />
            <Route path='/following' component={() => {
              return <Following user={this.state.user_name} check={this.state.isLoggedIn} />
            }} />
            <Route path='/settings' component={() => {
              return <Settings user={this.state.user_name} check={this.state.isLoggedIn} />
            }} />
            <Route path='/Appearance' component={() => {
              return <Appearance check={this.state.isLoggedIn} user={this.state.user_name} />
            }} />
            <Route path='/myPosts' component={() => {
              return <MyPosts check={this.state.isLoggedIn} user={this.state.user_name} />
            }} />
            <Route path='/post/:id' component={() => {
              return <SinglePost check={this.state.isLoggedIn} user={this.state.user_name} />
            }} />



          <div>

          </div>
        </div>
      </Router>
    )
  }
}


export default App;
