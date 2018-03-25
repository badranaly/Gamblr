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
      username: props.user
		}
	}

	componentDidMount() {
    services.checkLogin(TokenService.read())
    .then(resp => {
      this.setState({
        username: resp.data.token.username,
        isLoggedIn: resp.data.isLoggedIn
      })
    },this.getLikes())
    .catch(err => {console.log(err)})
	}

  getLikes(){
    services.getAllLikes().then(like => {
      this.setState({
        apiDataLoaded: true,
        apiData: like.data.data.posts
      })
    }).catch(err => {
      console.log(err)
    })
  }

	renderLikes() {
    console.log('inside render likes, heres the data ->', this.state)
		return this.state.apiData.map((el,i) => {
      console.log('inside initial return statement of render likes');
			return <Post key={el.id} post={el} list='favs' user={this.state.username} />
		})

	}

  	render(){
        return (
      		<div>
            {
            this.state.isLoggedIn ?
            <div>
              <Header />
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
