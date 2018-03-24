//Lillian

import React, {Component} from 'react'
import services from './services/apiServices'
import Post from './Post'

class PostList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			apiDataLoaded: false,
			apiData: null,
			username: props.user
		}
	}

	componentDidMount() {
		services.getAllPosts().then(post => {
			console.log(post,'merp')
			this.setState({
				apiDataLoaded: true,
				apiData: post.data.data.posts
			})
		}).catch(err => {
			console.log(err)
		})
	}

	renderPosts() {
		console.log('loaded data', this.state.username)
		return this.state.apiData.map((el,i) => {
			return <Post key={el.id} post={el} user={this.state.username}/>
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
