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
      pic: '' ,
      bg: '',
      blog_name: '',
      blog_desc: '',
      fireRedirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
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
          <input type='text' placeholder='Username' name='password' onChange={this.handleOnChange}/>
          <input type='password' name='password' placeholder='******' onChange={this.handleOnChange}/>
          <input type='text' placeholder='Username' name='password' onChange={this.handleOnChange}/>
          <input type='password' name='password' placeholder='******' onChange={this.handleOnChange}/>
          <input type='text' placeholder='Username' name='password' onChange={this.handleOnChange}/>
          <input type='password' name='password' placeholder='******' onChange={this.handleOnChange}/>
          <input type='submit' />
          <p>Already a user? Sign in </p><a href='/login'>here</a>
        </form>
        {this.state.fireRedirect ? <Redirect to={'/login'} /> : ''}
      </div>
    )
  }
}

export default Signup
