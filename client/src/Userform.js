import React, {Component} from 'react'
import services from './services/apiServices'
import TokenService from './services/TokenService'
import {Redirect, BrowserRouter, Link} from 'react-router-dom'
import Feed from './Feed'
import Header from './Header'
import Footer from './Footer'

class Userform extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_name: props.user,
      password: '',
      fireRedirect: false,
      isLoggedIn: props.check,
      failedLogin: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

handleSubmit(data){
  data.preventDefault()
    services.login(this.state)
    .then(resp => {
      TokenService.save(resp.data.token);
      this.setState({
        isLoggedIn: true
      })
      console.log('this is render feed function call', resp.data.user.user_name)
    })
    .catch(err => {
      this.setState({
        failedLogin: true
      })
    console.log(`err: ${err}`);
  }, this.renderError())
  }

onChange(e){
  let name = e.target.name
  let value = e.target.value
  this.setState({
    [name]: value
  })
}

renderError() {
  return(
  <div className="alert">
    <span className="closebtn"></span>
    Invalid Credentials -- please try again.
  </div>
  )
}

render(){
  return(
    <div>
      {console.log('this is props for isLoggedIn inside userform', this.state.isLoggedIn)}
      {console.log('this is props for username inside userform', this.state.user_name)}
      {this.state.isLoggedIn ? <Feed check={this.state.isLoggedIn} user={this.state.username}/> :
      <div>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <form class="form-signin">
            <h2 class="form-signin-heading">Please login</h2>
            <input type='text' class="form-control" placeholder='Username' name='user_name' required="" autofocus="" value={this.state.user_name} onChange={this.onChange}/>
            <input type='password' class="form-control" name='password' placeholder='******' required="" value={this.state.password} onChange={this.onChange}/>
            <button class="btn btn-lg btn-danger btn-block" type='submit'>Login</button>
            <p>Don't have an account?  Sign up <a href="/signup">here</a></p>
          </form>
          {this.state.failedLogin ? this.renderError(): ''}
        </form>
        <Footer />
      </div>
      }
      {/* {this.state.isLoggedIn ? <Redirect to='/feed' /> : console.log('isloggedin for login component', this.state)} */}
    </div>
    )
  }
}


export default Userform
