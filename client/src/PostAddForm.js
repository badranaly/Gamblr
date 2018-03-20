//Lillian
import React, {Component} from 'react'
import services from './services/apiServices'
import {Redirect} from 'react-router-dom'

class PostAddForm extends Component {
	constructor() {
		super()
		this.state = {
			type: '',
			content: '',
			user_id: 1,
			notes: 0,
			fireRedirect: false
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}

	handleInputChange(e) {
		let name = e.target.name
		let value = e.target.value
		this.setState({
			[name]: value
		})
	}

	handleFormSubmit(e) {
		e.preventDefault()
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
				<form onSubmit={this.handlFormSubmit}>
					<select>
						<option select value='text'>Text</option>
						<option value='photo'>Image</option>
						<option value='Link'>Link</option>
						<option value='Video'>Video</option>
					</select>
					<input type='text' name='content' onChange={this.handleInputChange} placeholder='Enter your stuff...' />
					<input type='submit' value='Add Post!' />
				</form>
				{this.state.fireRedirect ? <Redirect to={`/feed`} /> : ''}
			</div>
		)
	}
}

export default PostAddForm