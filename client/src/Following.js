import React, {Component} from 'react'
import services from './services/apiServices'

class Following extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiDataLoaded: false,
      apiData: null
    }
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

  renderPosts() {
		console.log('loaded data', this.props)
		return this.state.apiData.map((el,i) => {
			return (
        <div>
        <p>{el.pic} {el.user_name}</p>
      </div>
      )
		})
	}


  render(){
    return (
      <div>
        <h1>Following the following Users:</h1>
        <input type="text" value="Enter User Name"></input>
        <button>Add New Follower</button>
        {this.state.apiDataLoaded ? this.renderPosts() : ''}

      </div>
    )
  }
}

export default Following
