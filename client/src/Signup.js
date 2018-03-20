//LetsGetit

import React, {Component} from 'react'

class Signup extends Component {
  render(){
    return (
      <div>
        <form>
          <input type='text' placeholder='Username' name='password' />
          <input type='password' name='password' value='password' />
          <p>Already a user? Sign in </p><a href='/login'>here</a>
        </form>
      </div>
    )
  }
}

export default Signup
