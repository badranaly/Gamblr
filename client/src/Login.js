//LetsGetit

import React, {Component} from 'react'
import services from './services/apiServices'
import './Login.css'

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
  //    let name = e.target.name
      console.log('username:', this.state.user_name)
      console.log('password:', this.state.password);
      services.authenticateUser(this.state)
      .then(user => {
        console.log(user)
      })
      .catch(err => console.log('loggin is fucked up', err))
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div class="wrapper">
            <form class="form-signin">
              <h2 class="form-signin-heading">Please login</h2>
              <input type="text" class="form-control" name="user_name" placeholder="Username" required="" autofocus="" onChange={this.handleChange}/><br/>
              <input type="password" onChange={this.handleChange} class="form-control" name="password" placeholder="Password" required=""/>
              <button class="btn btn-lg btn-danger btn-block" type="submit">Login</button>
            </form>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
