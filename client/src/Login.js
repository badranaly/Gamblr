//LetsGetit

import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import services from './services/apiServices'
import './Login.css'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_name: '',
      password: '',
      authenticated: false,
      fireRedirect: false,
      failedLogin: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

handleChange(e){
  let name = e.target.name
  let value = e.target.value
  this.setState({
    [name]:value
  })
}

renderError() {
  return(
  <div className="alert">
    <span className="closebtn"></span>
    Invalid Credentials -- please try again.
  </div>
  )
}

handleSubmit(e){
      e.preventDefault()
  //    let name = e.target.name
      console.log('username:', this.state.user_name)
      console.log('password:', this.state.password);
    /*  services.authenticateUser(this.state)
      .then(user => {
        console.log(user)
      })
      .catch(err => console.log('loggin is fucked up', err)) */
      services.userLogin(this.state.user_name, this.state.password)
      .then(user => {
        this.setState({
          fireRedirect: true
        })
        console.log("SUCCESS")
      })
      .catch(err => {
        this.setState({
          failedLogin: true
        })
        console.log("ERROR")
      })
  }

  render(){
    return (
      <div>
        <br/>
        <br/>

        <h1><span className="GA GAlogin">GA</span><span className="mblr">mblr</span></h1>

        <form className="form-signin loginForm" onSubmit={this.handleSubmit}>
          <div className="wrapper">
              <h2 className="loginForm form-signin-heading">Login</h2>
              <input type="text" className="form-control" name="user_name" placeholder="Username" required="" autoFocus="" onChange={this.handleChange}/><br/>
              <input type="password" onChange={this.handleChange} className="form-control" name="password" placeholder="Password" required=""/>
              <br/>
              <button className="loginbtn btn btn-lg btn-danger btn-block" type="submit">Login</button>
              <p>Don't have an account?  Sign up <a href="/signup">here</a></p>
            </div>

            </form>

            {this.state.failedLogin ? this.renderError(): ''}
        {this.state.fireRedirect ? <Redirect to={'/feed'} /> : ''}
      </div>
    )
  }
}

export default Login
