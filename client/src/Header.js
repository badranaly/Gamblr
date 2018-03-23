//LetsGetit

import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Navbar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import './index.css';


class Header extends Component {
	constructor() {
		super()
		this.state = {
			fireRedirect: false
		}
		this.handleButtonClick = this.handleButtonClick.bind(this)
	}

	handleButtonClick() {
		this.setState({
			fireRedirect: true
		})
	}

	render(){
		return (
			<div>
				<nav class="navbar navbar-inverse">
					<div class="container-fluid">
						<div class="navbar-header">
							<a class="navbar-brand" href="#"><span class="GA">GA</span>mblr</a>
						</div>
						<ul class="nav navbar-nav">
							<li class="active"><a href="#">Home</a></li>
							<li class="active2"><a href="#">Account</a></li>
							  <Button onClick={this.handleButtonClick} bsSize="large" bsStyle="danger">New Post</Button>
							 {this.state.fireRedirect ? <Redirect to='/addPost' /> : ''}
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

export default Header
