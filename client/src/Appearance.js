import React, {Component} from 'react'
import services from './services/apiServices'
import Header from './Header'
import Footer from './Footer'

class Appearance extends Component {
constructor(props){
  super(props)
  this.state = {
    user_name: '',
    pic: '',
    bg: '',
    blog_name: '',
    blog_desc: ''
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
    console.log('info updated')
  })
  .catch(err => {
    console.log('appearance got fucked up', err)
    })
}
  render(){
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit}><br />
          <p>username: </p><input type='text' name='user_name' onChange={this.handleInputChange} />
          <p>pic: </p><input type='text' name='pic' onChange={this.handleInputChange} />
          <p>background: </p><input type='text' name='bg' onChange={this.handleInputChange} />
          <p>blog name: </p><input type='text' name='blog_name' onChange={this.handleInputChange} />
          <p>blog description: </p><input type='text' name='blog_desc' onChange={this.handleInputChange} /><br />
          <input type='submit'/>
        </form>
        <Footer />
      </div>
    )
  }
}

export default Appearance
