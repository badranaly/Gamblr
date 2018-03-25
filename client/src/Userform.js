import React, {Component} from 'react'
import services from './services/apiServices'
import TokenService from './services/TokenService'
// import {BrowserRouter, Link} from 'react-router-dom'
import Feed from './Feed'
// import Header from './Header'
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
    console.log("handle state", this.state)
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
  console.log("inside onchange")
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
  console.log("this state", this.state)
  return(
    <div>
      {console.log('this is props for isLoggedIn inside userform', this.state.isLoggedIn)}
      {console.log('this is props for username inside userform', this.state.user_name)}
      {this.state.isLoggedIn ? <Feed check={this.state.isLoggedIn} user={this.state.username}/> :
      <div>
        <h1><span className="GA GAlogin">GA</span><span className="mblr">mblr</span></h1>
        <form className="form-signin loginForm" onSubmit={this.handleSubmit}>
          <div className="wrapper">
              <h2 className="loginForm form-signin-heading">Login</h2>
              <input type="text" className="form-control" name="user_name" placeholder="Username" required="" autoFocus="" onChange={this.onChange}/><br/>
              <input type="password" onChange={this.onChange} className="form-control" name="password" placeholder="Password" required=""/>
              <br/>
              <button className="loginbtn btn btn-lg btn-danger btn-block" type="submit">Login</button>
              <p>Don't have an account?  Sign up <a href="/signup">here</a></p>
            </div>

            </form>
            {this.state.failedLogin ? this.renderError(): ''}
        <Footer />
      </div>
      }
      {/* {this.state.isLoggedIn ? <Redirect to='/feed' /> : console.log('isloggedin for login component', this.state)} */}
    </div>
    )
  }
}


export default Userform
