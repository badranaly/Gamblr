//LetsGetit

import React, {Component} from 'react'
import services from './services/apiServices'
import Redirect from 'react-router-dom'

class Settings extends Component {
constructor(props){
  super(props)
  this.state = {
    password: '',
    fireRedirect: false
  }
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleInputChange = this.handleInputChange.bind(this)
}

handleSubmit(e){
  e.preventDefault()
  services.updatePassword(this.state)
  // console.log('inside handle submit ', this.state.password)
  .then(userInfo => {
    this.setState({
      fireRedirect: true
    })
  })
  .catch(err => {
    console.log('handlesubmit is fucked up', err)
  })
}

handleInputChange(e){
  let name = e.target.name
  let value = e.target.value
  this.setState({
    [name]: value
  })
  console.log(value)
}

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        new password: <input type='text' value={this.state.password} name='password' onChange={this.handleInputChange}/>
        <input type='submit' />
        </form>
      </div>
    )
  }
}

export default Settings
