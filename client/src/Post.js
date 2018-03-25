//Lillian
import React, {Component} from 'react'
import services from './services/apiServices'
import {Button} from 'react-bootstrap'
import ReactPlayer from 'react-player'
import TokenService from './services/TokenService'
import './index.css';

class Post extends Component {
	constructor(props) {
		super(props)
		this.state = {
			likeClicked: false,
			post_id: props.list === 'favs' ? props.post.post_id : (props.list === 'myposts' || props.list === 'userposts' || props.list === 'singlepost') ? props.post.id : props.post.postid,
			fireRedirect: false,
			likes: parseInt(props.post.notes),
			username: props.user,
		}
	}


componentDidMount() {
	services.checkLogin(TokenService.read())
	.then(resp => {
		this.setState({
			username: resp.data.token.username,
			isLoggedIn: resp.data.isLoggedIn
		})


	}, this.checkAllLikes())
	.catch(err => {console.log(err)})
}

checkAllLikes(){
	services.checkLikes(this.props.id, this.state.post_id).then(posts => {
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
			services.getPost(this.state.post_id).then(post => {
				this.setState({
					likes: post.data.data.post.notes
				})
			})
		}).catch(err => {
			console.log(err)
		})

	}

	removeLike() {
		services.removeLike(this.state.post_id,this.props.id).then(like => {
			this.setState({
				likeClicked: false,
			})
			services.subtractLike(this.state.post_id).then(like2 => {
				services.getPost(this.state.post_id).then(post => {
					this.setState({
						likes: post.data.data.post.notes
					})
				})
			})
			.catch(err=> {
				console.log(err)
			})
		}).catch(err => {
			console.log(err)
		})
	}

	render() {
		return (
			<div className='post mainPost'>
				<img className="profilePic" alt='' src={this.props.post.pic} />
				<h2 className="userPost" className='post'><a className="userLink" href={`/user/${this.props.post.user_name}`}>{this.props.post.user_name}</a></h2>
				<div className="posts">{this.props.post.type === 'video' ? <ReactPlayer url={this.props.post.content} /> : this.props.post.type === 'photo' ? <img alt='' src={this.props.post.content} /> : this.props.post.type === 'link' ? <a href={this.props.post.content}>{this.props.post.content}</a> : this.props.post.content}</div>
				<br/>
				{this.props.list !== 'myposts' ? <Button className="rightAdj" className="like" className="btn btn-danger" bsStyle="info" onClick={this.state.likeClicked ? this.removeLike.bind(this) : this.addLike.bind(this)}>{this.state.likeClicked ? 'Unlike' : 'Like'}</Button> : ''}
				<p className="rightAdj likes">Likes: {this.state.likes}</p>
				<p className="leftAdj viewPost"><a href={`/post/${this.state.post_id}`}>View Post</a></p>
				{/*View Post works but loads really...really slow when in myposts page*/}
				<br/>
				<br/>


			</div>
		)
	}
}
export default Post
