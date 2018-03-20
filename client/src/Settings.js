//LetsGetit

import React, {Component} from 'react'
import services from './services/apiServices'

class Settings extends Component {
constructor(props){
  super(props)
  this.state = {
    apiDataLoaded: false,
    username: user_name,
    password: password
  }
  this.handleSubmit = this.handleSubmit.bind(this)
}

componentDidMount() {
  services.getUser(this.state.username)
  .then((userInfo) => {
    this.setState({
      apiDataLoaded: true,
      user_name,
      password
    })
  })
  .catch(err = {
    console.log('fucked up in settings..', err)
  })
}

handleSubmit(e){
  e.preventDefault()
  services.updateUserInfo(this.state, username)
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
}

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input type='text' value={this.state.user_name} name='username' />
        <input type='text' value={this.state.password} name='password' />
        </form>
      </div>
    )
  }
}

export default Settings

/*
Front-end Necessities :
 - Feed
 - Username and password to test Settings page
 -
