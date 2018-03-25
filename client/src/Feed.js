//Lillian
import React, {Component} from 'react'
import Header from './Header'
import PostList from './PostList'
import Footer from './Footer'
import services from './services/apiServices'
import TokenService from './services/TokenService'
// import Login from './Login'
// import {Redirect} from 'react-router-dom'
import Userform from './Userform'

class Feed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoggedIn: false,
			username: '',
			fireRedirect: false
		}
}


componentDidMount(){
	console.log('i am being called')
	services.checkLogin(TokenService.read())
	.then(resp => {
		console.log('inside component did mount ', resp.data.isLoggedIn)
		console.log('inside component did mount ', resp.data.token.username)

		this.setState({
			isLoggedIn: resp.data.isLoggedIn,
			username: resp.data.token.username
		})
	})
	.catch(err => console.log(err));
	}


	render() {
		return (
			<div className='feed'>
				{
				this.state.isLoggedIn ?
				<div>
					{console.log('inside feed component ---> ', this.state)}
					<Header />
					<PostList user={this.state.username}/>
					<Footer />
				</div>
				:
				<Userform />
			}
			</div>
		)
	}
}

export default Feed
