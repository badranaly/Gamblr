//LetsGetit

import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import services from './services/apiServices'
import Feed from './Feed'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_name: '',
      password: '',
      authenticated: false,
      fireRedirect: false
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

handleSubmit(e){
      e.preventDefault()
      let name = e.target.name
      console.log('username:', this.state.user_name)
      console.log('password:', this.state.password);
      services.authenticateUser(this.state)
      .then(data => {
        console.log('this works', data)
        this.setState({
          fireRedirect: true
        })
      })
      .catch(err => console.log('loggin is fucked up', err))
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name='user_name' placeholder='Username' type='text' onChange={this.handleChange}/><br />
          <input name='password' type='password' onChange={this.handleChange}/>
          <input type='submit' />
        </form>
        <a href='/signup'>Sign up here</a>

        {this.state.fireRedirect ? <Redirect to='/feed' /> : <p>Please log in</p>}
      </div>
    )
  }
}


export default Login
