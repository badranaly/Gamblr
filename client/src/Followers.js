import React, {Component} from 'react'
import services from './services/apiServices'
import Follower from './Follower'
import Userform from './Userform'
import TokenService from './services/TokenService'

class Followers extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
      user_name: '',
      isLoggedIn: props.check
    }

  }

  getTheFollowers(){
    services.getFollowers()
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
        username: resp.data.token.username
      })
    }, this.getTheFollowers())
    .catch(err => {console.log(err)})
  }


  /* handleRemove(user) {
    console.log(user)
  } */

  renderUsers() {
		return this.state.apiData.map((el,i) => {
      console.log('this is followers console -> ', this.state.isLoggedIn)
			return (
        <div>
          <Follower pic={el.pic} user_name={el.user_name} />
      {/*  <p><img src={el.pic} alt="Pic"/> {el.user_name}</p> */}
      </div>
      )
		})
	}


  /* handleFormSubmit(e) {
    e.preventDefault();
    console.log('HANDLED')
  } */

  render(){
    return (
      this.state.isLoggedIn ?
      <div>
        <h1>Currently followed by:</h1>
        {this.state.apiDataLoaded ? this.renderUsers() : ''}
      </div>
      :
      <Userform />
    )
  }
}

export default Followers
