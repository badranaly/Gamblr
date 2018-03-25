//LetsGetit

import React, {Component} from 'react'
import PostList from './PostList'
import Userform from './Userform'
import TokenService from './services/TokenService'
import services from './services/apiServices'

class Userpage extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: props.user,
      isLoggedIn: props.check
    }
  }

  componentDidMount(){
    services.checkLogin(TokenService.read())
    .then(resp => {
      this.setState({
        username: resp.data.token.username,
        isLoggedIn: resp.data.isLoggedIn
      })
    })
    .catch(err => {console.log(err)})
  }

  render(){
    return (
      <div>
        {
        this.state.isLoggedIn ?
        <div>
            {console.log('i am inside userpage component -->', this.state)}
            <img />
            <img />
            <PostList user={this.state.username}/>
        </div>
        :
        <Userform />
      }
      </div>
    )
  }
}

export default Userpage
