//Lillian
import React, {Component} from 'react'
import services from './services/apiServices'
import {Redirect} from 'react-router-dom'
import TokenService from './services/TokenService'
import Userform from './Userform'

class PostAddForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoggedIn: props.check,
			username: props.user,
			type: 'text',
			content: '',
			user_id: 1,
			notes: 0,
			fireRedirect: false
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}

componentDidMount(){
		services.checkLogin(TokenService.read())
		.then(resp => {
			this.setState({
				isLoggedIn: resp.data.isLoggedIn,
				username: resp.data.token.username
			})
		})
		.catch(err => console.log(err));
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
				{
					this.state.isLoggedIn ?
					<div>
						<form onSubmit={this.handlFormSubmit}>
							<select name='type' onChange={this.handleInputChange}>
								<option value='text'>Text</option>
								<option value='photo'>Image</option>
								<option value='link'>Link</option>
								<option value='video'>Video</option>
							</select>
							<textarea name='content' rows='10' cols='30' onChange={this.handleInputChange} placeholder='Enter your stuff...'></textarea>
							<input type='submit' value='Add Post!' />
						</form>
						{this.state.fireRedirect ? <Redirect to='/feed' /> : ''}
				 </div>
				 : <Userform />
			 }
			</div>
		)
	}
}

export default PostAddForm
