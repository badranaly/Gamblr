import React, {Component} from 'react'
import services from './services/apiServices'
import { Redirect } from 'react-router-dom';

class Following extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
      user_name: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    services.getFollowing().then(posts => {
      console.log("data from post", posts)
      this.setState({
        apiDataLoaded: true,
        apiData: posts.data.data.users
      })
    }).catch(err => {
      console.log(err)
    })
  }


  handleRemove(e) {
    console.log(e.target.name)
    e.stopPropagation();
    services.getUserID(e.target.name)
    .then(user => {
      console.log(user.data.data.user[0].id)
      services.removeFollowing(user.data.data.user[0].id)
      .then(user2 => {
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
		console.log('loaded data', this.props)
		return this.state.apiData.map((el,i) => {
			return (
        <div>
        <p><img src={el.pic} alt="Pic"/> {el.user_name}<button name={el.user_name} onClick={this.handleRemove}>-</button></p>
      </div>
      )
		})
	}

  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    console.log(value)
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    console.log('HANDLED', this.state.user_name)
    services.getUserID(this.state.user_name)
    .then(user => {
      console.log(user.data.data.user)
      services.addFollowing(user.data.data.user)
      .then(user2 => {
        console.log(user2)
      })
      .catch(err=> {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  /*  services.addFollowing(this.state.user_name)
      .then(user => {
        this.setState({
          user_name: ''
        })
      })
      .catch(err => {
        console.log(err)
      }) */
  }

  render(){
    return (
      <div>
        <h1>Users currently being followed:</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input type='text' name='user_name' onChange={this.handleInputChange} placeholder='Enter User Name' />
          <input type='submit' value="Enter User Name"/>
        </form>
      {/* } {this.state.fireRedirect ? <Redirect to='/following' /> : ''} */}
        {this.state.apiDataLoaded ? this.renderUsers() : ''}

      </div>
    )
  }
}

export default Following
