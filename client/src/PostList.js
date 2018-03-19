//Lillian

import React, {Component} from 'react'

class PostList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			apiDataLoaded: false,
			apiData: null
		}
	}

	renderPosts() {
		console.log('loaded data', this.props)
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