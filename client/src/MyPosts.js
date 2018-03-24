import React, {Component} from 'react'
import services from './services/apiServices'
import Post from './Post'
import Header from './Header'
import Footer from './Footer'
import TokenService from './services/TokenService'

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
			services.getAllMyPosts().then(post => {
			console.log(post,'hehe')
			this.setState({
				apiDataLoaded: true,
				apiData: post.data.data.posts
			})
		}).catch(err => {
			console.log(err)
		})
	}).catch(err => {console.log(err)})}

	renderPosts() {
		return this.state.apiData.map((el,i) => {
			return <Post key={el.id} post={el} />
		})
	}

	render() {
		return (
			<div className='mypostlist'>
				<Header />
				{this.state.apiDataLoaded ? this.renderPosts() : ''}
				<Footer />
			</div>
		)
	}
}

export default MyPosts
