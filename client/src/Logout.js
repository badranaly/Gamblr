import React, {Component} from 'react'
import TokenService from './services/TokenService'
// import Userform from './Userform'
import {Redirect} from 'react-router-dom'

class Logout extends Component{
  constructor(props){
    super(props)
    this.state = {
      fireRedirect: false
    }
  }

logout() {
      TokenService.destroy();
      this.setState({
        fireRedirect: true
      })
      console.log('this is tokenservice of logout', TokenService)
}

  render(){
    return (
      <div>
      {this.logout()}
      <Redirect to='/login' />
    </div>
    )
  }
}

export default Logout
