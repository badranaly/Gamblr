import React, {Component} from 'react'
import services from './services/apiServices'
import Header from './Header'
import Footer from './Footer'
import TokenService from './services/TokenService'
import Userform from './Userform'
import {Button, Input} from 'semantic-ui-react'


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
      isLoggedIn: props.check,
      loggedUserId: null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.updateData = this.updateData.bind(this);
    this.refresher = this.refresher.bind(this);

  }

  componentDidMount() {
    this.refresher();
    }

    refresher() {
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
            this.updateData(response.data.data.user[0].id)
          })
          .catch(err => {
          console.log(err)
          }
      )})
      .catch(err => {
        console.log(err)
      })

  }

  // functionality that is called when component mounts
  // also called by component methods to trigger a reload of the page as needed
updateData(input) {
    services.getFollowing(input).then(posts => {
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
      services.removeFollowing(user.data.data.user[0].id, this.state.loggedUserId)
      .then(user2 => {
        this.updateData();
        this.refresher();
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
        <p><img className='userLink' src={el.pic} alt="Pic"/><a href={link}>{el.user_name}</a><br /><Button color='red' size='tiny' name={el.user_name} onClick={this.handleRemove}>Unfollow</Button></p>
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
        services.addFollowing(user.data.data.user, this.state.loggedUserId)
        .then(user2 => {
          console.log(user2)
          this.refresher();
      //    this.updateData();
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
        {
          this.state.isLoggedIn ?
          <div>
            <Header />
            {console.log('inside following comp', this.state)}
            <h1>Users currently being followed:</h1>
            <form onSubmit={this.handleFormSubmit}>
              <Input autoFocus className='input' type='text' name='user_name' size='mini' onChange={this.handleInputChange} placeholder='Search...' />
              <Button type='submit' size='mini' color='red'>Follow User</Button>
            </form>
            {this.state.noUser ? this.renderError(): ''}
            {this.state.apiDataLoaded ? this.renderUsers() : ''}
            <Footer />
          </div>
         :
        <Userform />
        }

      </div>
    )
  }
}

export default Following
