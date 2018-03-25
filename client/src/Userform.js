import React, {Component} from 'react'
import services from './services/apiServices'
import TokenService from './services/TokenService'
import {Redirect, BrowserRouter, Link} from 'react-router-dom'
import Feed from './Feed'

class Userform extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_name: props.user,
      password: '',
      fireRedirect: false,
      isLoggedIn: props.check
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
//
// componentDidMount(){
//   services.checkLogin(TokenService.read()).then(resp => {
//       this.setState({
//         fireRedirect: true
//       })
//       console.log('inside component did mount', resp.data.user.user_name)
//     })
//     .catch(err => console.log(`err: ${err}`));
// }

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
    .catch(err => console.log(`err: ${err}`));
  }

onChange(e){
  let name = e.target.name
  let value = e.target.value
  this.setState({
    [name]: value
  })
}

render(){
  return(
    <div>
      {console.log('this is props for isLoggedIn inside userform', this.state.isLoggedIn)}
      {console.log('this is props for username inside userform', this.state.user_name)}
      {this.state.isLoggedIn ? <Feed check={this.state.isLoggedIn} user={this.state.username}/> :
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Username' name='user_name' value={this.state.user_name} onChange={this.onChange}/>
          <input type='password' name='password' placeholder='******' value={this.state.password} onChange={this.onChange}/>
          <input type='submit' value='login'/><br />
        </form>
        <Link to='/Signup'> <p>don't have an accout?</p> </Link>
      </div>
      }
      {/* {this.state.isLoggedIn ? <Redirect to='/feed' /> : console.log('isloggedin for login component', this.state)} */}
    </div>
    )
  }
}


export default Userform
