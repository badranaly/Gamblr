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
				<nav className="navbar navbar-inverse">
					<div className="container-fluid">
						<div className="navbar-header">
							<a className="navbar-brand" href="#"><span className="GA">GA</span>mblr</a>
						</div>
						<ul className="nav navbar-nav">
							<li className="active"><a href="#">Home</a></li>
							<li className="active2"><a href="#">Account</a></li>
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
