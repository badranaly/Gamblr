//LetsGetit

import React, {Component} from 'react'
import Redirect from 'react-router-dom'
import services from './services/apiServices'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_name: username,
      password: password,
      fireRedirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
      e.preventDefault()
      services.authenticateUser(this.state.user_name, this.state.password)({
        console.log('initiating login procedure..')
        .then(data => {
          if(data.username == this.state.user_name){
            this.setState({
              fireRedirect: true
            })
          }
        })
        .catch()
      })
  }
  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name='username' placeholder='Username' type='text' /><br />
          <input name='password' type='password' />
          <input type='submit' />
        </form>
        <a href='/signup'>Sign up here</a>
      </div>
    )
  }
}


export default Login
