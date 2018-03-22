//Lillian
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import services from './services/apiServices'

class Post extends Component {
	constructor(props) {
		super(props)
		this.state = {
			likeClicked: false,
			user_id: this.props.user_id,
			post_id: this.props.id
		}
	}

	addLike() {
		services.addLike(this.state).then(like => {
			this.setState({
				likeClicked: true
			})
		}).catch(err => {
			console.log(err)
		})
	}

	removeLike() {
		services.removeLike(this.state).then(like => {
			this.setState({
				likeClicked: false
			})
		}).catch(err => {
			console.log(err)
		}) 
	}

	render() {
		return (
			<div className='post'>
				<img alt='' src='#' />
				<h2>{this.props.post.user_name}</h2>
				<p>{this.props.post.content}</p>
				<button className='like-button' onClick={this.state.likeClicked ? this.removeLike : this.addLike}>Like</button>
			</div>
		)
	}
}

export default Post