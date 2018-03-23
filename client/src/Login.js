//LetsGetit

import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import services from './services/apiServices'
import Feed from './Feed'
import Userform from './Userform'

class Login extends Component {
  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

onSubmit(data){
  this.props.submit(data)
}

  render(){
    return (
      <div>
        <Userform submit={this.onSubmit} />
        <a href='/signup'>Sign up here</a>
      </div>
    )
  }
}


export default Login
