//Lillian

import React, {Component} from 'react'
import services from './services/apiServices'
import Post from './Post'

class PostList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			apiDataLoaded: false,
			apiData: null
		}
	}

	componentDidMount() {
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
		return this.state.apiData.map((el,i) => {
			return <Post key={el.id} post={el} />
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
