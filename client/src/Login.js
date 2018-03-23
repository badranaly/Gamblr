//LetsGetit

import React, {Component} from 'react'
import Userform from './Userform'

class Login extends Component {
  constructor(props){
    super(props)
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
        <Userform submit={this.onSubmit} />
        <a href='/signup'>Sign up here</a>
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
}


export default Login
