//LetsGetit

import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {NavDropdown, MenuItem, Navbar, NavItem, Nav} from 'react-bootstrap';
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
				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
						  	<a href="/feed"><span className="GA">GA</span>mblr</a>
							</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavItem className="navItem" eventKey={1} href="\feed">Home</NavItem>
							<NavDropdown className="navItem" eventKey={3} title="Account " id="basic-nav-dropdown">
								<MenuItem href='/favs' eventKey={3.1}>Likes</MenuItem>
								<MenuItem href='/following' eventKey={3.2}>Following</MenuItem>
								<MenuItem href='/myPosts' eventKey={3.3}>My Posts</MenuItem>
								<MenuItem href='/followers' eventKey={3.4}>Followers</MenuItem>
								<MenuItem divider />
								<MenuItem href='/settings' eventKey={3.5}>Settings</MenuItem>
								<MenuItem href='/Appearance' eventKey={3.6}>Appearance</MenuItem>
								<MenuItem href='/logout' eventKey={3.7}>Log Out</MenuItem>
							</NavDropdown>
							{this.state.fireRedirect ? <Redirect to='/addPost' /> : ''}
							<NavItem className="postbtn" onClick={this.handleButtonClick} active='true' eventKey={4} bssize="large" bsStyle="tabs" >New Post</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		)
	}
}

export default Header
