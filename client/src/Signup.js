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


handleSubmit(e){
  e.preventDefault()
  services.checkExistingUser(this.state.user_name)
  .then(response => {
    console.log("User Name already exists")
  })
  .catch(err => {
    services.createUser(this.state)
    .then(info => {
      this.setState({
        fireRedirect: true
      })
    })
    .catch(err => {
      console.log('signup not working', err)
    })
  })


}

handleOnChange(e){
  let name = e.target.name
  let value = e.target.value
  this.setState({
    [name]: value
  })
}

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Username' name='user_name' onChange={this.handleOnChange}/>
          <input type='password' name='password' placeholder='******' onChange={this.handleOnChange}/>
          <input type='hidden'  name='pic' onChange={this.handleOnChange}/>
          <input type='hidden' name='bg' onChange={this.handleOnChange}/>
          <input type='hidden'  name='blog_name' onChange={this.handleOnChange}/>
          <input type='hidden' name='blog_desc'  onChange={this.handleOnChange}/>
          <input type='submit' />
          <p>Already a user? Sign in <a href='/login'>here</a></p>
        </form>
        {this.state.fireRedirect ? <Redirect to={'/appearance'} /> : ''}
      </div>
    )
  }
}

export default Signup
