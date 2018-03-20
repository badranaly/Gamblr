//LetsGetit

import React, {Component} from 'react'
import services from './services/apiServices'
import {Redirect} from 'react-router-dom'

class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_name: '',
      password: '',
      fireRedirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

handleSubmit(e){
  e.preventDefault()
  services.createUser(this.state)
  .then(info => {
    this.setState({
      fireRedirect: true
    })
  })
  .catch(err => {
    console.log('signup not working', err)
  })

}

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Username' name='password' />
          <input type='password' name='password' placeholder='******' />
          <input type='submit' />
          <p>Already a user? Sign in </p><a href='/login'>here</a>
        </form>
        {this.state.fireRedirect ? <Redirect to={'/login'} /> : ''}
      </div>
    )
  }
}

export default Signup
