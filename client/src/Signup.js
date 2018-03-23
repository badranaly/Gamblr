//LetsGetit

import React, {Component} from 'react'
import Userform from './Userform'

class Signup extends Component {
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
        <p>Already a user? Sign in </p><a href='/login'>here</a>
      </div>
    )
  }
}

export default Signup
