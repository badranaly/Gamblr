import React, {Component} from 'react'
import services from './services/apiServices'
import Follower from './Follower'
import Header from './Header'
import Footer from './Footer'
// Followers.js is a container that holds elements for each follower
import Userform from './Userform'
import TokenService from './services/TokenService'


class Followers extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
      user_name: props.user,
      isLoggedIn: props.check,
      loggedUserId: null
    }

  }
//fuction to get a list of all users who follow a given logged in user

getTheFollowers(input){
    services.getFollowers(input)
    .then(users => {
      this.setState({
        apiDataLoaded: true,
        apiData: users.data.data.users
      })
    }).catch(err => {
      console.log(err)
    })
  }

componentDidMount() {
    services.checkLogin(TokenService.read())
    .then(resp => {
      this.setState({
        isLoggedIn: resp.data.isLoggedIn,
        user_name: resp.data.token.username
      })
      services.getUserID(this.state.user_name)
        .then(response => {
          this.setState({
            loggedUserId: response.data.data.user[0].id
          })
          this.getTheFollowers(this.state.loggedUserId)
        })
        .catch(err => {
        console.log(err)
        })

    })
    .catch(err => {console.log(err)})
  }
  // uses the data retrieved from above to create an individual component rendered for each user who follows

  renderUsers() {
    console.log('this is followers console -> ', this.state)
		return this.state.apiData.map((el,i) => {
      console.log("iside render users")

			return (
        <div>
          <Follower pic={el.pic} user_name={el.user_name} logged={this.state.loggedUserId}/>
      </div>
      )
		})
	}

  render(){
    return (
      this.state.isLoggedIn ?
      <div>
        <Header />
        <h1>Currently followed by:</h1>
        {this.state.apiDataLoaded ? this.renderUsers() : ''}
        <Footer />
      </div>
      :
      <Userform />
    )
  }
}

export default Followers
