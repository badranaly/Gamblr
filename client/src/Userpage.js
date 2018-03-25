import React, {Component} from 'react'

import services from './services/apiServices'
import Post from './Post'
import Header from './Header'
import Footer from './Footer'
import Userform from './Userform'
import TokenService from './services/TokenService'

class UserPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      userDataLoaded: false,
      postDataLoaded: false,
      userData: null,
      postData: null,
      fireRedirect: false,
      username: props.user,
      isLoggedIn: props.check,
      user_id: null,
      loggedUserId: null
    }
    this.getStuff = this.getStuff.bind(this);

  }

  componentDidMount(){
    services.checkLogin(TokenService.read())
    .then(resp => {
      this.setState({
        username: resp.data.token.username,
        isLoggedIn: resp.data.isLoggedIn
      })

      services.getUserID(this.state.username)
        .then(response => {
          this.setState({
            loggedUserId: response.data.data.user[0].id
          })
        })
        .catch(err => {
        console.log(err)
        })

      this.getStuff()



    })
    .catch(err => {console.log(err)})
  }

  getStuff() {
      let curr = window.location.href
      let curr2 = curr.length
      let curr3 = curr.substring(27, curr2)
      services.getUser(curr3).then(user => {
        console.log('userdata',user)
        this.setState({
          userDataLoaded: true,
          userData: user.data.data.user,
          user_id: user.data.data.user.id
        })
      }).catch(err => {
        console.log(err)
      })
      services.getUserPage(curr3).then(data => {
        console.log(data,'userpagestuff')
        this.setState({
          postDataLoaded: true,
          postData: data.data.data.info
        })
      }).catch(err => {
        console.log(err)
      })
  }

  renderPage() {
    return (
      <div>
        <img className='user-background' alt='' src='#' />
        <img className='user-pic' alt='' src={this.state.userData.pic} />
        <h1>{this.state.userData.blog_name}</h1>
        <h2>{this.state.userData.blog_desc}</h2>
        {this.state.postData.map((el,i) => {
          console.log('singleuser',el)
          return <Post key={el.id} post={el} id={this.state.loggedUserId} list='userposts' />
        })}
      </div>
    )
  }

  render(){
    return (
      <div>
        {
        this.state.isLoggedIn ?
        <div>
          <Header />
          {this.state.userDataLoaded && this.state.postDataLoaded ? this.renderPage() : ''}
          <Footer />
        </div>
        : <Userform />
      }
    </div>
    )
  }
}

export default UserPage
