//LetsGetit

import React, {Component} from 'react'
import services from './services/apiServices'
import Header from './Header'
import Footer from './Footer'
import TokenService from './services/TokenService'
import Userform from './Userform'
import {Redirect} from 'react-router-dom'
import {Input, Form, Button} from 'semantic-ui-react'


class Settings extends Component {
constructor(props){
  super(props)
  this.state = {
    isLoggedIn: props.check,
    username: props.user,
    password: '',
    fireRedirect: false
  }
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleInputChange = this.handleInputChange.bind(this)
  this.handleDelete = this.handleDelete.bind(this)
}

componentDidMount(){
  services.checkLogin(TokenService.read())
  .then(resp => {
    this.setState({
      username: resp.data.token.username,
      isLoggedIn: resp.data.isLoggedIn
    })
  })
  .catch(err => {console.log(err)})
}

handleSubmit(e){
  e.preventDefault()
  services.updatePassword(this.state)
  .then(userInfo => {
    console.log('change pass was successful ', this.state.fireRedirect)
    this.setState({
      fireRedirect: true
    })
  })
  .catch(err => {
    console.log(err)
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
  services.getUserID(this.state.username)
  .then(id => {
    services.removeLikesByUser(id.data.data.user[0].id)
    .then(likes => {
      console.log(likes)
    })
    .catch(err => {
      console.log(err)
    })
    services.removeFollowByUser(id.data.data.user[0].id)
    .then(follow => {
      console.log(follow)
    })
    .catch(err => {
      console.log(err)
    })
    services.removePostsByUser(id.data.data.user[0].id)
    .then(post => {
      console.log(post)
    })
    .catch(err => {
      console.log(err)
    })
    services.removeCommentsByUser(id.data.data.user[0].id)
    .then(comment => {
      console.log(comment)
    })
    .catch(err => {
      console.log(err)
    })
  })
  .catch(err => {
    console.log(err)
  })
  services.deleteUser(this.state.username)
  .then(user => {
    TokenService.destroy();
    this.setState({
      fireRedirect: true
    })
    console.log(user)
  })
  .catch(err => {
    console.log(err)
  })

}

  render(){
    return (
      <div>
        {this.state.isLoggedIn ?
        <div>
          <Header />
          <h1> Account Settings </h1>
          <br/>
          <br/>
          <br/>
          <Form size='small' onSubmit={this.handleSubmit}>
          <Form.Field inline >
            <label>New Password: </label>
            <Input type='text' value={this.state.password} name='password' onChange={this.handleInputChange}/>
            <Button type='submit'>Change</Button>
          </Form.Field>
          </Form>
          <br/>
          <br/>
          <Button color='red' onClick={this.handleDelete}>Delete Account</Button>
          <Footer />
          {this.state.fireRedirect ? <Redirect to={'/login'} /> : ''}
        </div>
        :
        <Userform />
      }
      {this.state.fireRedirect ? <Redirect to='/feed' /> : ''}
      </div>
    )
  }
}

export default Settings
