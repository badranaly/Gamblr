//LetsGetit

import React, {Component} from 'react'
import Userform from './Userform'
import Feed from './Feed'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: this.props.check
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.logout = this.logout.bind(this)
  }

onSubmit(data){
  this.props.submit(data)
}

logout(ev){
  this.props.loggingout(ev)
}
  render(){
    return (
      <div>
        {console.log('checking if user is logged in ---> ',this.state.isLoggedIn)}
        {
        this.state.isLoggedIn ?
        <Feed />
        :
        <div>
        <Userform submit={this.onSubmit} />
        <a href='/signup'>Sign up here</a>
        <button onClick={this.logout}>Logout</button>
      </div>
        }
    </div>
    )
}
}


export default Login
