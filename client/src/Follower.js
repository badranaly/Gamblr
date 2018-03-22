import React, {Component} from 'react'
import services from './services/apiServices'

class Follower extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
      isFollower: false
    }
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {

    this.setState({
      apiDataLoaded: true
    })
  /*  services.checkFollowing().then(posts => {
      console.log("data from post", posts)
      this.setState({
        apiDataLoaded: true,
        apiData: posts.data.data.users
      })
    }).catch(err => {
      console.log(err)
    }) */
    console.log('mounted')
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

  renderUser() {
		console.log('loaded data', this.props)
      if(this.state.isFollower === true) {
			     return (
             <div>
               <p><img src={this.props.pic} alt="Pic"/> {this.props.user_name}<button name={this.props.user_name} onClick={this.handleRemove}>Unfollow</button></p>
             </div>
           )
      }
      else {
          return (
            <div>
              <p><img src={this.props.pic} alt="Pic"/> {this.props.user_name}<button name={this.props.user_name} onClick={this.handleAdd}>Follow</button></p>
            </div>
          )
      }


	}



  render(){
    return (
      <div>
      {/* } {this.state.fireRedirect ? <Redirect to='/following' /> : ''} */}
        {this.state.apiDataLoaded ? this.renderUser() : ''}

      </div>
    )
  }
}

export default Follower
