import React, {Component} from 'react'
import services from './services/apiServices'
import Header from './Header'
import Footer from './Footer'
import TokenService from './services/TokenService'
import Userform from './Userform'

class Appearance extends Component {
constructor(props){
  super(props)
  this.state = {
    username: props.user,
    isLoggedIn: props.check,
    pic: '',
    bg: '',
    blog_name: '',
    blog_desc: ''
  }
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleInputChange = this.handleInputChange.bind(this)
}

componentDidMount(){
  services.checkLogin(TokenService.read())
  .then(resp => {
    this.setState({
      isLoggedIn: resp.data.isLoggedIn,
      username: resp.data.token.username
    })
  })
  .catch(err => {console.log(err)})
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
  services.updateAppearance(this.state, this.state.username)
  .then(info => {
    console.log('info updated')
  })
  .catch(err => {
    console.log('appearance got fucked up', err)
    })
}
  render(){
    return (
      <div>
        {
          this.state.isLoggedIn ?
          <div>
            <Header />
            <form onSubmit={this.handleSubmit}><br />
            <p>username: </p><input type='text' name='username' onChange={this.handleInputChange} placeholder={this.state.username} />
            <p>pic: </p><input type='text' name='pic' onChange={this.handleInputChange} />
            <p>background: </p><input type='text' name='bg' onChange={this.handleInputChange} />
            <p>blog name: </p><input type='text' name='blog_name' onChange={this.handleInputChange} />
            <p>blog description: </p><input type='text' name='blog_desc' onChange={this.handleInputChange} /><br />
            <input type='submit'/>
          </form>
          <Footer />
        </div>
        : <Userform />
        }
      </div>
    )
  }
}

export default Appearance
