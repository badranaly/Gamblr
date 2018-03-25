import React, {Component} from 'react'
import services from './services/apiServices'
import Header from './Header'
import Footer from './Footer'
import {Redirect} from 'react-router-dom'


class Appearance extends Component {
constructor(props){
  super(props)
  this.state = {
    user_name: 'chris',
    pic: '',
    bg: '',
    blog_name: '',
    blog_desc: '',
    fireRedirect: false
  }
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleInputChange = this.handleInputChange.bind(this)
}

handleInputChange(e){
  let name = e.target.name
  let value = e.target.value
  this.setState({
    [name]: value
  })

}

handleSubmit(e){
  e.preventDefault()
  services.updateAppearance(this.state, this.state.user_name)
  .then(info => {
    this.setState({
      fireRedirect: true
    })
    console.log('info updated')
  })
  .catch(err => {
    console.log(err)
    })
}
  render(){
    return (
      <div>
        <Header />
        <h1> Profile Settings </h1>
        <form onSubmit={this.handleSubmit}><br />
          <p>Profile Picture (link): </p><input type='text' name='pic' onChange={this.handleInputChange} />
          <p>Blog Title: </p><input type='text' name='blog_name' onChange={this.handleInputChange} />
          <p>Blog Description: </p><input type='text' name='blog_desc' onChange={this.handleInputChange} /><br />
          <input type='submit'/>
        </form>
        {this.state.fireRedirect ? <Redirect to={`/user/`+this.state.user_name} /> : ''}
        <Footer />
      </div>
    )
  }
}

export default Appearance
