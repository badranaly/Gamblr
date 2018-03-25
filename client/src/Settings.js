//LetsGetit

import React, {Component} from 'react'
import services from './services/apiServices'
import Header from './Header'
import Footer from './Footer'

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
  services.getUserID("chris")
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
        <Header />
        <h1> Account Settings </h1>
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
        <Footer />
      </div>
    )
  }
}

export default Settings
