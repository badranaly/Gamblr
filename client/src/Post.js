//Lillian
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Post extends Component {
	constructor(props) {
		super(props)
		this.state = {
			likes: 0,
			username: props.user
		}
	}

	addLike() {
	}

	render() {
		return (
			<div className='post'>
				{console.log('inside post js', this.state)}
				<img alt='' src='#' />
				<h2>{this.state.username}</h2>
				<p>{this.props.post.content}  - Notes: {this.props.post.notes}</p>
				<button className='like-button' onClick={this.addLike}>Like</button>
			</div>
		)
	}
}

export default Post
