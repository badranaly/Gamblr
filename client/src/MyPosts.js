import React, {Component} from 'react'
import services from './services/apiServices'
import Post from './Post'
import Header from './Header'
import Footer from './Footer'
import TokenService from './services/TokenService'
import Userform from './Userform'

class MyPosts extends Component {
	constructor(props) {
		super(props)
		this.state = {
			apiDataLoaded: false,
			apiData: null,
			isLoggedIn: props.check,
			username: props.user,
			loggedUserId: null
		}
	}

componentDidMount() {
	services.checkLogin(TokenService.read())
	.then(resp => {
		this.setState({
			isLoggedIn: resp.data.isLoggedIn,
			username: resp.data.token.username
		})

		services.getUserID(this.state.username)
			.then(response => {
				this.setState({
					loggedUserId: response.data.data.user[0].id
				})
				this.getAllPosts(this.state.loggedUserId)
			})
			.catch(err => {
			console.log(err)
			})


	})
	.catch(err => {console.log(err)})
	}

	getAllPosts(input){
		services.getAllMyPosts(input).then(post => {
			console.log(post,'hehe')
			this.setState({
				apiDataLoaded: true,
				apiData: post.data.data.posts
			})
		}).catch(err => {
			console.log(err)
		})
	}

	renderPosts() {
		console.log('inside myposts ', this.state)
		return this.state.apiData.map((el,i) => {
			console.log('eejflem',el)
			return <Post key={el.id} post={el} list='myposts' user={this.state.username}/>
		})
	}

	render() {
		return (
			<div className='mypostlist'>
				{
				 this.state.isLoggedIn ?
					<div>
						<Header />
						<h1>My Posts</h1>
						{this.state.apiDataLoaded ? this.renderPosts() : console.log('im false in myposts')}
						<Footer />
					</div>
				 :
				 <Userform />

			}
			</div>
		)
	}
}

export default MyPosts
