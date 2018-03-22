//LetsGetit

import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

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
		    <h1>this is the header</h1>
		    <button onClick={this.handleButtonClick}>New Post</button>
		    {this.state.fireRedirect ? <Redirect to={'/addPost'} /> : ''}
		  </div>
		)
	}
}


export default Header
