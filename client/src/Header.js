//LetsGetit

import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class Header extends Component {
  render(){
    return (
      <div>
        <h1>this is the header</h1>
        <button href='/addPost'>New Post</button>
      </div>
    )
  }
}


export default Header
