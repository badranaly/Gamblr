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
        	console.log('inside successful check following' + this.state.user_id + " " + this.state.post_id)
         	this.setState({
           		likeClicked: true
         	})
        }).catch(err => {
          	console.log('inside failed check following')
          	this.setState({
            	likeClicked: false
          	})
         	console.log(err)
       	})
	}

	addLike() {
		console.log(this.props.post)
		services.addLike(this.state).then(like => {
			this.setState({
				likeClicked: true,
			})
		}).catch(err => {
			console.log(err)
		})
		services.getPost(this.state.post_id).then(post => {
			console.log(post,'posts')
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
		}).catch(err => {
			console.log(err)
		})
		services.getPost(this.state.post_id).then(post => {
			console.log(post,'posts')
			this.setState({
				likes: post.data.data.post.notes
			})
		})
	}

	render() {
		console.log(this.props.post,'favesprops')
		return (
			<div className='post'>
				<img alt='' src={this.props.post.pic} />
				<h2><i className="glyphicon glyphicon-user"></i><a href={`/user/${this.props.post.user_name}`}>{this.props.post.user_name}</a></h2>
				<p className="posts">{this.props.post.type === 'video' ? <ReactPlayer url={this.props.post.content} /> : this.props.post.type === 'photo' ? <img alt='' src={this.props.post.content} /> : this.props.post.type === 'link' ? <a href={this.props.post.content}>{this.props.post.content}</a> : this.props.post.content}</p>
				{this.props.list !== 'myposts' ? <Button className='like' bsSize="large" bsStyle="info" onClick={this.state.likeClicked ? this.removeLike.bind(this) : this.addLike.bind(this)}>{this.state.likeClicked ? 'Unlike' : 'Like'}</Button> : ''}
				<p>Likes: {this.state.likes}</p>
			</div>
		)
	}
}
export default Post
