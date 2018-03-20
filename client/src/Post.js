//Lillian
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Post extends Component {
	constructor(props) {
		super(props)
		this.state = {
			likes: 0
		}
	}

	addLike() {
		
	}
	render() {
		return (
			<div className='post'>
				<img alt='' src='#' />
				<h2>{this.props.post.user_name}</h2>
				//profile pic
				//username
				//post content
				//notes
				//like button
				<button className='like-button' onClick={this.addLike}>Like</button>
			</div>
		)
	}
}

export default Post