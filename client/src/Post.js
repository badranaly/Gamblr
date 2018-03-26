//Lillian
import React, {Component} from 'react'
import services from './services/apiServices'
// import {Button} from 'react-bootstrap'
import ReactPlayer from 'react-player'
import TokenService from './services/TokenService'
import './index.css';
import {Card, Icon, Button, Image} from 'semantic-ui-react'

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
	console.log("like props", this.props.id)
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
		services.addLike(this.state, this.props.id).then(like => {
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
			<div className='card'>
								<Card color='red' centered='true' fluid='true'>
							    <Card.Content className='header' textAlign='left'><a href={`/user/${this.props.post.user_name}`} className='header'>{this.props.post.user_name}</a></Card.Content>
									<Image className='profilepic' src={this.props.post.pic} />
							    <Card.Content description={this.props.post.type === 'video' ? <ReactPlayer width='500' controls='true' url={this.props.post.content} /> : this.props.post.type === 'photo' ? <img alt='' src={this.props.post.content} /> : this.props.post.type === 'link' ? <a href={this.props.post.content}>{this.props.post.content}</a> : this.props.post.content} />
							    <Card.Content extra className='view'>
										{this.props.list !== 'myposts' ?
										<Button
										onClick={this.state.likeClicked ? this.removeLike.bind(this) : this.addLike.bind(this)}
										 className='like'
										 color='red'
										 content={this.state.likeClicked ? 'Unlike' : 'Like'}
										 icon='heart'
										 label={{ basic: true, color: 'red', pointing: 'left', content: this.state.likes }}
									 /> : ''}
							      <a href={`/post/${this.state.post_id}`}><h3>View Post</h3></a>
							    </Card.Content>
				  			</Card>
			</div>
		)
	}
}
export default Post
