//Lillian
import React, {Component} from 'react'
import services from './services/apiServices'
import {Button} from 'react-bootstrap'
import ReactPlayer from 'react-player'
import './index.css';

class Post extends Component {
	constructor(props) {
		super(props)
		this.state = {
			likeClicked: false,
			user_id: (props.list === 'favs' || props.list === 'userposts') ? props.post.user_id : props.post.follower_id,
			post_id: props.list === 'favs' ? props.post.post_id : props.post.postid,
			fireRedirect: false,
			likes: parseInt(props.post.notes)
		}
	}


	componentDidMount() {
		services.checkLikes(this.state.user_id, this.state.post_id).then(posts => {
					this.setState({
							likeClicked: true
					})
				}).catch(err => {
						this.setState({
							likeClicked: false
						})
					console.log(err)
				})
	}

	addLike() {
		services.addLike(this.state).then(like => {
			this.setState({
				likeClicked: true,
			})
		}).catch(err => {
			console.log(err)
		})
		services.getPost(this.state.post_id).then(post => {
			this.setState({
				likes: post.data.data.post.notes
			})
		})
	}

	removeLike() {
		services.removeLike(this.state.post_id,this.state.user_id).then(like => {
			this.setState({
				likeClicked: false,
			})
			services.subtractLike(this.state.post_id).then(like2 => {
			})
			.catch(err=> {
				console.log(err)
			})
		}).catch(err => {
			console.log(err)
		})
		services.getPost(this.state.post_id).then(post => {
			this.setState({
				likes: post.data.data.post.notes
			})
		})
	}

	render() {
		let link = "/post/" + this.state.post_id
		return (
			<div className='post'>
				<img alt='' src={this.props.post.pic} />
				<h2 className='post'><a href={`/user/${this.props.post.user_name}`}>{this.props.post.user_name}</a></h2>
				<p className="posts">{this.props.post.type === 'video' ? <ReactPlayer url={this.props.post.content} /> : this.props.post.type === 'photo' ? <img alt='' src={this.props.post.content} /> : this.props.post.type === 'link' ? <a href={this.props.post.content}>{this.props.post.content}</a> : this.props.post.content}</p>
				{this.props.list !== 'myposts' ? <Button className='like' bsSize="large" bsStyle="info" onClick={this.state.likeClicked ? this.removeLike.bind(this) : this.addLike.bind(this)}>{this.state.likeClicked ? 'Unlike' : 'Like'}</Button> : ''}
				<p className="rightAdj">Likes: {this.state.likes}</p>
				<p className="leftAdj"><a href={link}>View Post</a></p>


			</div>
		)
	}
}
export default Post
