import React, {Component} from 'react'
import services from './services/apiServices'
import TokenService from './services/TokenService'

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
    services.checkLogin(TokenService.read())
    .then(resp => {
      this.setState({
        isLoggedIn: resp.data.isLoggedIn,
        username: resp.data.token.username
      })
    }, this.following())
    .catch(err => {console.log(err)})
  }

following(){
    services.getUserID(this.props.user_name)
    .then(id => {
      services.checkFollowing(id.data.data.user[0].id)
      .then(posts => {
        console.log('inside successful check following')
         this.setState({
           apiDataLoaded: true,
           apiData: posts.data.data.users,
           isFollower: true
         })
       }).catch(err => {
          console.log('inside failed check following')
          this.setState({
            apiDataLoaded:true,
            isFollower: false

          })
         console.log(err)
       })
     })
    .catch(err => {
      console.log(err)
    })
}



  handleRemove(e) {
    e.stopPropagation();
    services.getUserID(e.target.name)
    .then(user => {
      console.log("inside handleremove", user.data.data.user[0].id)
      services.removeFollowing(user.data.data.user[0].id)
      .then(user2 => {
        console.log("succesfful remove", user2)
        })
      .catch(err=> {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleAdd(e) {
    console.log("adding", e.target.name)
    e.stopPropagation();
    services.getUserID(e.target.name)
    .then(user => {
      services.followNew(user)
      .then(user2 => {
        console.log("result from addFollowing", user2)
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
        {console.log('inside follower component -->', this.state)}
      {/* } {this.state.fireRedirect ? <Redirect to='/following' /> : ''} */}
        {this.state.apiDataLoaded ? this.renderUser() : ''}

      </div>
    )
  }
}

export default Follower
