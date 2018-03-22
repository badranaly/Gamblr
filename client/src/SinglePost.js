import React, {Component} from 'react'
import services from './services/apiServices'

class SinglePost extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiDataLoaded: false,
      postData: null,
      fireRedirect: false,
      commentData: null
    }
  }

  componentDidMount() {
    services.singlePost(this.props.match.params.id)
    .then(data => {
      this.setState({
        apiDataLoaded: true,
        postData: data.data.data.post[0]
      })
      services.getComments(this.props.match.params.id)
      .then(comments => {
        console.log(comments)
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  renderPage() {

          return (
            <div>
              <h1>Post</h1>
              <h2>{this.state.postData.user_name}</h2>
              <p>{this.state.postData.content}</p>
              <h4>Likes</h4>
              <p>Comments:</p>
            </div>
          )
	}



  render(){
    return (
      <div>
        {this.state.apiDataLoaded ? this.renderPage() : ''}
      </div>
    )
  }
}

export default SinglePost
