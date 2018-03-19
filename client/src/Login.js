import React, {Component} from 'react'

class Login extends Component {
  render(){
    return (
      <div>
        <form>
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
