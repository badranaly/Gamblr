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
  this.handleDelete = this.handleDelete.bind(this)
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

handleDelete(e){
  //REPLACE THIS WITH USER NAME FROM SESSION
  services.deleteUser("chris")
  .then(user => {
    console.log(user)
  })
  .catch(err => {
    console.log(err)
  })
}

  render(){
    return (
      <div>
        <br/>
        <br/>
        <br/>
        <form onSubmit={this.handleSubmit}>
        new password: <input type='text' value={this.state.password} name='password' onChange={this.handleInputChange}/>
        <input type='submit' />
        </form>
        <br/>
        <br/>
        <button onClick={this.handleDelete}>Delete Account</button>
      </div>
    )
  }
}

export default Settings
