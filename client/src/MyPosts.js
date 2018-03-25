import React, {Component} from 'react'
import services from './services/apiServices'
import Post from './Post'
import Header from './Header'
import Footer from './Footer'
import TokenService from './services/TokenService'
import Userform from './Userform'

class MyPosts extends Component {
	constructor() {
		super()
		this.state = {
			apiDataLoaded: false,
			apiData: null
		}
	}

componentDidMount() {
	services.checkLogin(TokenService.read())
	.then(resp => {
		this.setState({
			isLoggedIn: resp.data.isLoggedIn,
			username: resp.data.token.username
		})
	}, this.getAllPosts())
	.catch(err => {console.log(err)})
	}

	getAllPosts(){
		services.getAllMyPosts().then(post => {
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
