import React, {Component} from 'react'

class Userform extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_name: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

handleSubmit(e){
  e.preventDefault()
  this.props.submit(this.state)
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
      <form onSubmit={this.handleSubmit}>
        <input type='text' placeholder='Username' name='user_name' value={this.state.user_name} onChange={this.onChange}/>
        <input type='password' name='password' placeholder='******' value={this.state.password} onChange={this.onChange}/>
        <input type='submit' />
      </form>
    </div>
    )
  }
}


export default Userform
