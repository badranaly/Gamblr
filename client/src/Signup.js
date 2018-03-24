//LetsGetit

import React, {Component} from 'react'
import Userform from './Userform'
import {Link} from 'react-router-dom'

class Signup extends Component {
constructor(props){
  super(props)
  this.state = {
    isLoggedIn: this.props.user
  }
}

  render(){
    return (
      <div>
        {console.log('this is signup prop', this.state)}
        <Userform  user={this.props.user}/>
        <Link to='/login'><p>Already a user?</p></Link>
      </div>
    )
  }
}

export default Signup
