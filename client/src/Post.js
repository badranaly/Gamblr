//Lillian
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import services from './services/apiServices'
import {Redirect} from 'react-router-dom'

class Post extends Component {
	constructor(props) {
		super(props)
		this.state = {
			likeClicked: false,
			user_id: props.post.follower_id,
			post_id: props.post.id,
			fireRedirect: false
		}
	}

	componentDidMount() {
		// if (this.props.list === 'favs') {
		// 	this.setState({
		// 		likeClicked: true
		// 	})
		// }
		// else {
			services.checkLikes(this.state.user_id, this.state.post_id)
      .then(posts => {
        console.log('inside successful check following')
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
		//}
	}

	addLike() {
		console.log(this.props.post)
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
		console.log(this.props.post,'favesprops')
		return (
			<div className='post'>
				<img alt='' src={this.props.post.pic} />
				<h2>{this.props.post.user_name}</h2>
				<p>{this.props.post.content}</p>
				<button className='like-button' onClick={this.state.likeClicked ? this.removeLike.bind(this) : this.addLike.bind(this)}>{this.state.likeClicked ? 'Unlike' : 'Like'}</button>
			</div>
		)
	}
}

export default Post
