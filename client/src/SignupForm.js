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

  handleSubmit(data){
    data.preventDefault()
    services.register(this.state)
    .then(resp => {
      TokenService.save(resp.data.token)
      this.setState({
        success: true
      })
    })
    .catch(err => console.log(`err: ${err}`));
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
            <input type='text' name='user_name' placeholder='Username' value={this.state.user_name} onChange={this.onChange}/>
            <input type='text' name='password' placeholder='Password' value={this.state.password} onChange={this.onChange}/>
            <input type='submit' value='signup' />
          </form>
        </div>
        }
        {this.state.success ? <Redirect to='/login' /> : ''}
      </div>
    )
  }
}

export default SignupForm
