import React, {Component} from 'react'
import TokenService from './services/TokenService'
import services from './services/apiServices'
import Userform from './Userform'
import Header from './Header'
import Footer from './Footer'
import Feed from './Feed'
import {Redirect} from 'react-router-dom'


class SignupForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: props.check,
      user_name: '',
      password: '',
      fireRedirect: false,
      success: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount(){
    services.checkLogin(TokenService.read())
    .then(resp => {
      this.setState({
        isLoggedIn: resp.data.isLoggedIn
      })
    })
    .catch(err => {console.log(err)})
  }

  renderError() {
    console.log('inside render error for signup');
    return(
    <div className="alert">
      <span className="closebtn"></span>
      User Already Exists -- please choose a different Username.
    </div>
    )
  }

  handleSubmit(data){
    data.preventDefault()
    services.register(this.state)
    .then(resp => {
      TokenService.save(resp.data.token)
      this.setState({
        success: true
      })
    })
    .catch(err => {
      console.log('user already exists -- msg from submit ', err)
      this.setState({
        success: false
      })
    })
}

onChange(e){
  let name = e.target.name
  let value = e.target.value
  this.setState({
    [name] : value
  })
}

  render(){
    return (
      <div>
        {
        this.state.isLoggedIn ?
        <Feed />
        :
        <div>
          {console.log(this.state.user_name)}
          <form onSubmit={this.handleSubmit}>
            <input type='text' placeholder='Username' name='user_name' onChange={this.onChange}/>
            <input type='password' name='password' placeholder='******' onChange={this.onChange}/>
            <input type='hidden'  name='pic' onChange={this.onChange}/>
            <input type='hidden' name='bg' onChange={this.onChange}/>
            <input type='hidden'  name='blog_name' onChange={this.onChange}/>
            <input type='hidden' name='blog_desc'  onChange={this.onChange}/>
            <input type='submit' />
            <p>Already a user? Sign in <a href='/login'>here</a></p>
          </form>
          {console.log('sucess status: ', this.state.success)}
          {/* {this.state.success ? '' : this.renderError()} */}
        </div>
        }
        {this.state.success ? <Redirect to='/appearance' /> : ''}
      </div>
    )
  }
}

export default SignupForm
