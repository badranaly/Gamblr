import React, {Component} from 'react'
import services from './services/apiServices'

class UserPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      postDataLoaded: false,
      postData: null,
      fireRedirect: false,
      commentData: null,
      commentDataLoaded: false,
      comment: ''
    }
  }

  componentDidMount() {
      console.log("giddy up")
  }


  renderUser() {
    return this.state.commentData.map((el,i) => {
      return (
        <div>
        <p><img src={el.pic} alt="Pic"/> {el.user_name} {el.comment}</p>
      </div>
      )
    })
  }




  renderPosts() {

          return (
            <div>
              <h1>Post</h1>
              <h2>{this.state.postData.user_name}</h2>
              <p>{this.state.postData.content}</p>
              <h4>Likes</h4>
              <p>Add Comment:</p>

              <p>Comments:</p>
              {this.state.commentDataLoaded ? this.renderComments() : ''}
            </div>
          )
	}



  render(){
    return (
      <div>
        {this.state.postDataLoaded ? this.renderPage() : ''}
      </div>
    )
  }
}

export default UserPage
