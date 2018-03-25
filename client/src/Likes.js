import React, {Component} from 'react'
import services from './services/apiServices'
import Post from './Post'
import Header from './Header'
import Footer from './Footer'
import Userform from './Userform'
import TokenService from './services/TokenService'


class Likes extends Component {
	constructor(props) {
		super(props)
		this.state = {
			apiDataLoaded: false,
			apiData: null,
      isLoggedIn: props.check,
      username: props.user,
			user_id: null
		}
	}

	componentDidMount() {
    services.checkLogin(TokenService.read())
    .then(resp => {
      this.setState({
        username: resp.data.token.username,
        isLoggedIn: resp.data.isLoggedIn
      })

			services.getUserID(this.state.username)
				.then(response => {
					this.setState({
						user_id: response.data.data.user[0].id
					})
					this.getAllLikes(response.data.data.user[0].id)
				})
				.catch(err => {
				console.log(err)
				})

    })
    .catch(err => {console.log(err)})
	}

  getAllLikes(input){
		console.log('inside likes get all ikes', input)
    services.getAllLikes(input)
		.then(like => {
      this.setState({
        apiDataLoaded: true,
        apiData: like.data.data.posts
      })
    }).catch(err => {
      console.log(err)
    })
  }

	renderLikes() {
		return this.state.apiData.map((el,i) => {
			return <Post key={i} post={el} id={this.state.user_id} list='favs' user={this.state.username}/>
		})
	}

  	render(){
        return (
      		<div>
            {
            this.state.isLoggedIn ?
            <div>
              <Header />
							<h1>Liked Posts</h1>
              {this.state.apiDataLoaded ? this.renderLikes() : ''}
              <Footer />
            </div>
             :
            <Userform />
            }
      		</div>
    	)
  	}
}

export default Likes
