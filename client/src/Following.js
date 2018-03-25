import React, {Component} from 'react'
import services from './services/apiServices'
import Header from './Header'
import Footer from './Footer'
import { Redirect } from 'react-router-dom';
import TokenService from './services/TokenService'
import Userform from './Userform'


class Following extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
      user_name: '',
      noUser: false,
      username: props.user,
      isLoggedIn: props.check
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    services.checkLogin(TokenService.read())
    .then(resp => {
      this.setState({
        username: resp.data.token.username,
        isLoggedIn: resp.data.isLoggedIn
      })
    }, this.updateData())
    .catch(err => {console.log(err)})
    }
  // functionality that is called when component mounts
  // also called by component methods to trigger a reload of the page as needed
updateData() {
    services.getFollowing().then(posts => {
      this.setState({
        apiDataLoaded: true,
        apiData: posts.data.data.users
      })
    }).catch(err => {
      console.log(err)
    })
  }

  // removes a user from the list of users that you follow
  handleRemove(e) {
    console.log(e.target.name)
    e.stopPropagation();
    services.getUserID(e.target.name)
    .then(user => {
      services.removeFollowing(user.data.data.user[0].id)
      .then(user2 => {
        this.updateData();
        console.log(user2)
        })
      .catch(err=> {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })


  }

  renderUsers() {

		return this.state.apiData.map((el,i) => {
      let link = "/user/" + el.user_name
			return (
        <div>
        <p><img src={el.pic} alt="Pic"/> <a href={link}>{el.user_name}</a><button name={el.user_name} onClick={this.handleRemove}>-</button></p>
      </div>
      )
		})
	}

  renderError() {
    return(
    <div className="alert">
      <span className="closebtn"></span>
      Invalid User, please try again!
    </div>
    )
  }

  // captures what user is entering into the add new user to follow field
  handleInputChange(e) {
    this.setState({
      noUser: false
    })
    let name = e.target.name;
    let value = e.target.value;
    console.log(value)
    this.setState({
      [name]: value
    })
  }

  // process the user add
  handleFormSubmit(e) {
    e.preventDefault();
    services.getUserID(this.state.user_name)
    .then(user => {
      if(user.data.data.user.length === 0){
        this.setState({
          noUser: true
        })
      }
      else{
        services.addFollowing(user.data.data.user)
        .then(user2 => {
          console.log(user2)
          this.updateData();
        })
        .catch(err=> {
          console.log(err)
        })
      }

    })
    .catch(err => {
      console.log(err)
    })

  }

  render(){
    return (
      <div>
      <Header />
        {
          this.state.isLoggedIn ?
          <div>
            {console.log('inside following comp', this.state)}
            <h1>Users currently being followed:</h1>
            <form onSubmit={this.handleFormSubmit}>
              <input type='text' name='user_name' onChange={this.handleInputChange} placeholder='Enter User Name' />
              <input type='submit' value="Enter User Name"/>
            </form>
            {this.state.noUser ? this.renderError(): ''}
            {this.state.apiDataLoaded ? this.renderUsers() : ''}
          </div>
         :
        <Userform />
        }

        <Footer />
      </div>
    )
  }
}

export default Following
