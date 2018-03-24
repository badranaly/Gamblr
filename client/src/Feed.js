//Lillian
import React, {Component} from 'react'
import Header from './Header'
import PostList from './PostList'
import Footer from './Footer'
import services from './services/apiServices'
import TokenService from './services/TokenService'
import Login from './Login'
import {Redirect} from 'react-router-dom'

class Feed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoggedIn: false,
			fireRedirect: false
		}
		// this.checkLogin = this.checkLogin.bind(this)
	}

componentDidMount(){
	console.log('i am being called')
	services.checkLogin(TokenService.read())
	.then(resp => {
		console.log('inside component did mount ', resp.data.isLoggedIn)
		this.setState({
			isLoggedIn: resp.data.isLoggedIn
		})
	})
	.catch(err => console.log(err));
	}


	render() {
		return (
			<div className='feed'>
				{console.log('below is the response for check logn data')}

				{
				this.state.isLoggedIn ?
				<div>
					<Header />
					<PostList />
					<Footer />
				</div>
				:
				<Redirect to='/login' />
			}
			</div>
		)
	}
}

export default Feed
