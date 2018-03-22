//Lillian
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import services from './services/apiServices'
import {Redirect} from 'react-router-dom'

class Post extends Component {
	constructor(props) {
		super(props)
		this.state = {
			likeClicked: props.list === 'favs' ? true : false,
			user_id: props.post.user_id,
			post_id: props.post.id,
			fireRedirect: false
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
		services.removeLike(this.state.post_id,this.state.user_id).then(like => {
			this.setState({
				likeClicked: false,
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
				<button className='like-button' onClick={this.state.likeClicked ? this.removeLike.bind(this) : this.addLike.bind(this)}>{this.state.likeClicked ? 'Unlike' : 'Like'}</button>
			</div>
		)
	}
}

export default Post