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
	}, this.getPosts())
	.catch(err => {console.log(err)})
	}

	getPosts(){
		services.getAllPosts().then(post => {
			this.setState({
				apiDataLoaded: true,
				apiData: post.data.data.posts
			})
		}).catch(err => {
			console.log(err)
		})
	}


	renderPosts() {

		console.log('loaded data of PostList comp -->', this.state.username)

		return this.state.apiData.map((el,i) => {
			return <Post key={el.id} post={el} user={this.state.username}/>
		})
	}

	render() {
		return (
			<div className='post-list'>
				{console.log('inside post list comp', this.state)}
				{this.state.apiDataLoaded ? this.renderPosts() : ''}
			</div>
		)
	}
}

export default PostList
