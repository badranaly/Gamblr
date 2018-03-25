//Lillian

import React, {Component} from 'react'
import services from './services/apiServices'
import Post from './Post'
import TokenService from './services/TokenService'

class PostList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			apiDataLoaded: false,
			apiData: null,
			username: ''
		}
	}


componentDidMount() {
	services.checkLogin(TokenService.read())
	.then(resp => {
		this.setState({
			username: resp.data.token.username
		})

		services.getUserID(this.state.username)
			.then(response => {
				this.getPosts(response.data.data.user[0].id)
			})
			.catch(err => {
			console.log(err)
			})
		})
	.catch(err => {
		console.log(err)
	})
	}

	getPosts(input){
		services.getAllPosts(input).then(post => {
			this.setState({
				apiDataLoaded: true,
				apiData: post.data.data.posts
			})
		}).catch(err => {
			console.log(err)
		})
	}


	renderPosts() {
		return this.state.apiData.map((el,i) => {
			console.log('el', el)
			return <Post key={i} post={el} id={el.follower_id} user={this.state.username}/>
		})
	}

	render() {
		return (
			<div className='post-list'>
				{this.state.apiDataLoaded ? this.renderPosts() : ''}
			</div>
		)
	}
}

export default PostList
