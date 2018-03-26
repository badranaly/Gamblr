import React, {Component} from 'react'
import TokenService from './services/TokenService'
import services from './services/apiServices'
// import Userform from './Userform'
// import Header from './Header'
// import Footer from './Footer'
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
      success: null,
      failure: false,
      defaultPic: "https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1397187054/a828b608270067b84d6eaa4611f21a7b.jpg"
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.renderError = this.renderError.bind(this)
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
        // success: false,
        failure: true
      })
    })
}

onChange(e){
  this.setState({
    failure: false
  })
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
          <h1><span className="GA GAlogin">GA</span><span className="mblr">mblr</span></h1>
          <form className="form-signin loginForm" onSubmit={this.handleSubmit}>
            <div className='wrapper'>
              <h2 className="loginForm form-signin-heading">Sign up</h2>
            <input type='text' className="form-control" placeholder='Username' name='user_name' onChange={this.onChange}/><br />
            <input type='password' className="form-control" name='password' placeholder='******' onChange={this.onChange}/><br />
            <input type='hidden'  name='pic' onChange={this.onChange}/>
            <input type='hidden' name='bg' onChange={this.onChange}/>
            <input type='hidden'  name='blog_name' onChange={this.onChange}/>
            <input type='hidden' name='blog_desc'  onChange={this.onChange}/>
            <button className="loginbtn btn btn-lg btn-danger btn-block" type="submit">Signup</button>
            <p>Already a user? Sign in <a href='/login'>here</a></p>
          </div>
          </form>
          </div>
        }
        {this.state.success ? <Redirect to='/appearance' /> : ''}
        {this.state.failure ? this.renderError() : ''}


      </div>
    )
  }
}

export default SignupForm
