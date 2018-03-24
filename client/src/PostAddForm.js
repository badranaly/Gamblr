//Lillian
import React, {Component} from 'react'
import services from './services/apiServices'
import {Redirect} from 'react-router-dom'
import {Modal} from 'react-bootstrap'
import {Button} from 'react-bootstrap'

class PostAddForm extends Component {
	constructor() {
		super()
		this.state = {
			type: 'text',
			content: '',
			user_id: 1,
			notes: 0,
			fireRedirect: false
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleTypeChange = this.handleTypeChange.bind(this)
	}

	handleInputChange(e) {
		console.log(e.target.value)
		this.setState({
			content: e.target.value
		})
	}

	handleTypeChange(e) {
		this.setState({
			type: e.target.value
		})
	}

	handleFormSubmit(e) {
		e.preventDefault()
		console.log(this.state)
		services.createOnePost(this.state).then(post => {
			console.log('post adding...',post)
			this.setState({
				fireRedirect: true
			})
		}).catch(err => {
			console.log(err)
		})
	}

	render() {
		return (
			<div className='add-form'>
				<form>
					<Modal.Dialog>
						<Modal.Header>
							<Modal.Title>New Post</Modal.Title>
						</Modal.Header>
						<Modal.Body>
					<select name='type' onChange={this.handleTypeChange}>
						<option value='text'>Text</option>
						<option value='photo'>Image</option>
						<option value='link'>Link</option>
						<option value='video'>Video</option>
					</select>
					<textarea name='content' rows='10' cols='30' onChange={this.handleInputChange} placeholder={this.state.type === 'text' ? 'Enter post here...' : this.state.type === 'video' ? 'Enter Youtube Link here...' : 'Enter Link here...'}></textarea>
					<Button onClick={this.handleFormSubmit} bsStyle='danger' bsSize='small'>Add Post!</Button>
				</Modal.Body>
					</Modal.Dialog>
				</form>
				{this.state.fireRedirect ? <Redirect to={'/myPosts'} /> : ''}
			</div>
		)
	}
}

export default PostAddForm
