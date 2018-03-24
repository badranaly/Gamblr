// //LetsGetit
//
// import React, {Component} from 'react'
// import Feed from './Feed'
// import {Redirect} from 'react-router-dom'
// import Userform from './Userform'
//
// class Login extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       isLoggedIn: this.props.check,
//       fireRedirect: false
//     }
//     this.onSubmit = this.onSubmit.bind(this)
//     this.logout = this.logout.bind(this)
//   }
//
// logout(ev){
//   this.props.loggingout(ev)
// }
//   render(){
//     return (
//       <div>
//         <div>
//         <Userform submit={this.onSubmit} />
//         <a href='/signup'>Sign up here</a>
//       </div>
//
//     </div>
//     )
// }
// }
//
//
// export default Login
