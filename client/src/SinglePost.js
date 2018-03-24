import React, {Component} from 'react'
import services from './services/apiServices'
import Header from './Header'
import Footer from './Footer'

class SinglePost extends Component {
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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    services.singlePost(this.props.match.params.id)
    .then(data => {
      console.log('postdata',data.data.data.post[0])
      this.setState({
        postDataLoaded: true,
        postData: data.data.data.post[0]
      })
      services.getComments(this.props.match.params.id)
      .then(comments => {
        this.setState({
          commentDataLoaded: true,
          commentData: comments.data.data.comments
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }


  renderComments() {
    return this.state.commentData.map((el,i) => {
      let link = "/user/" + el.user_name
      return (
        <div>
        <p><img src={el.pic} alt="Pic"/><a href={link}>{el.user_name}</a> {el.comment}</p>
      </div>
      )
    })
  }


  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    console.log(value)
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    console.log('HANDLED form submit')
    services.addComment(this.props.match.params.id, this.state.comment)
    .then(comment => {
      console.log(comment)
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
              <h4>Likes: {this.state.postData.notes}</h4>
              <p>Add Comment:</p>
              <form onSubmit={this.handleFormSubmit}>
              <textarea name="comment" onChange={this.handleInputChange} placeholder="Enter Comment"></textarea>
                <input type="submit"></input>
              </form>

              <p>Comments:</p>
              {this.state.commentDataLoaded ? this.renderComments() : ''}
            </div>
          )
	}



  render(){
    return (
      <div>
        <Header />
        {this.state.postDataLoaded ? this.renderPage() : ''}
        <Footer />
      </div>
    )
  }
}

export default SinglePost
