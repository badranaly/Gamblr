import React, {Component} from 'react'
import services from './services/apiServices'
import Follower from './Follower'

class Followers extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
      user_name: ''
    }

  }

  componentDidMount() {
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


  /* handleRemove(user) {
    console.log(user)
  } */

  renderUsers() {
		return this.state.apiData.map((el,i) => {
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
      <div>
        <h1>Currently followed by:</h1>
        {this.state.apiDataLoaded ? this.renderUsers() : ''}

      </div>
    )
  }
}

export default Followers
