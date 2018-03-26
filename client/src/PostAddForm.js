//Lillian
import React, {Component} from 'react'
import services from './services/apiServices'
import {Redirect} from 'react-router-dom'
import {Modal} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import Header from './Header'
import Footer from './Footer'
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
		this.handleTypeChange = this.handleTypeChange.bind(this)
	}

componentDidMount(){
		services.checkLogin(TokenService.read())
		.then(resp => {
			this.setState({
				isLoggedIn: resp.data.isLoggedIn,
				username: resp.data.token.username
			})

			services.getUserID(this.state.username)
				.then(response => {
					this.setState({
						user_id: response.data.data.user[0].id
					})
				})
				.catch(err => {
				console.log(err)
				})


		})
		.catch(err => console.log(err));
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
				{
					this.state.isLoggedIn ?
					<div>
					<div>
						<Header />
					</div>
						<form>
							<div>
							<h1 className="GA ">New Post</h1>
									<select className="selectType" name='type' onChange={this.handleTypeChange}>
										<option value='text'>Text</option>
										<option value='photo'>Image</option>
										<option value='link'>Link</option>
										<option value='video'>Video</option>
									</select>
									<br/>
									<br/>
									<textarea name='content' rows='10' cols='50' onChange={this.handleInputChange} placeholder={this.state.type === 'text' ? 'Enter post here...' : this.state.type === 'video' ? 'Enter Youtube Link here...' : 'Enter Link here...'}></textarea>
									<br/>
									<br/>
									<Button onClick={this.handleFormSubmit} className="centerAddButton" bsStyle='danger' bsSize='small'>Add Post!</Button>
									<br/>
									<br/>
						</div>
						</form>
						{this.state.fireRedirect ? <Redirect to={'/myPosts'} /> : ''}
						<br/>
						<br/>
						<br/>
						<br/>
						<Footer />
					</div>
				 :
				 <Userform />
			 	}
			</div>
		)
	}
}

export default PostAddForm
