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
    this.handleAdd = this.handleAdd.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  getUserData() {
    services.getUserID(this.props.user_name)
    .then(id => {
      services.checkFollowing(id.data.data.user[0].id)
      .then(posts => {
         this.setState({
           apiDataLoaded: true,
           apiData: posts.data.data.users,
           isFollower: true
         })
       }).catch(err => {
          this.setState({
            apiDataLoaded:true,
            isFollower: false
          })
       })
     })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getUserData();
  }

// functionality to unfollow a user you currently follow who follows you
  handleRemove(e) {
    e.stopPropagation();
    services.getUserID(e.target.name)
    .then(user => {
      services.removeFollowing(user.data.data.user[0].id)
      .then(user2 => {
        this.getUserData();
        })
      .catch(err=> {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

// functionality to follow a user who you do not yet follow
  handleAdd(e) {
    e.stopPropagation();
    services.getUserID(e.target.name)
      .then(user => {
        services.followNew(user)
          .then(user2 => {
              this.getUserData();
            })
          .catch(err=> {
            console.log(err)
          });
      })
      .catch(err => {
        console.log(err)
      });
  }

  // render the user, with it showing follow / unfollow depending on if you follow the user, depending on if isFollower in state is true
  renderUser() {
    let link = "/user/" + this.props.user_name
      if(this.state.isFollower === true) {
			     return (
             <div>
               <p><img src={this.props.pic} alt="Pic"/><a href={link}>{this.props.user_name}</a><button name={this.props.user_name} onClick={this.handleRemove}>Unfollow</button></p>
             </div>
           )
      }
      else {
          return (
            <div>
              <p><img src={this.props.pic} alt="Pic"/><a href={link}>{this.props.user_name}</a><button name={this.props.user_name} onClick={this.handleAdd}>Follow</button></p>
            </div>
          )
      }
	}



  render(){
    return (
      <div>
        {this.state.apiDataLoaded ? this.renderUser() : ''}

      </div>
    )
  }
}

export default Follower
