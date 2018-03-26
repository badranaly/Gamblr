import React, {Component} from 'react'
import services from './services/apiServices'
import TokenService from './services/TokenService'
import {Button} from 'semantic-ui-react'

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

componentDidMount() {
    services.checkLogin(TokenService.read())
    .then(resp => {
      this.setState({
        isLoggedIn: resp.data.isLoggedIn,
        username: resp.data.token.username
      })
      this.getUserData();
    })
    .catch(err => {console.log(err)})
  }

getUserData() {
    services.getUserID(this.props.user_name)
    .then(id => {
      services.checkFollowing(id.data.data.user[0].id, this.props.logged)
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

// functionality to unfollow a user you currently follow who follows you
  handleRemove(e) {
    e.stopPropagation();
    services.getUserID(e.target.name)
    .then(user => {
      services.removeFollowing(user.data.data.user[0].id, this.props.logged)
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
        services.followNew(user, this.props.logged)
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
               <p><img src={this.props.pic} alt="Pic"/><a href={link}>{this.props.user_name}</a><br /><br /><Button color='red' size='mini' name={this.props.user_name} onClick={this.handleRemove}>Unfollow</Button><br /><br /></p>
             </div>
           )
      }
      else {
          return (
            <div>
              <p><img className='unfollow' src={this.props.pic} alt="Pic"/><a href={link}>{this.props.user_name}</a><br /><br /><Button color='red' size='mini' name={this.props.user_name} onClick={this.handleAdd}>Follow</Button><br /><br /></p>
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
