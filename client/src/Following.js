import React, {Component} from 'react'
import services from './services/apiServices'

class Following extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
      user_name: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    services.getFollowing().then(posts => {
      console.log("data from post", posts)
      this.setState({
        apiDataLoaded: true,
        apiData: posts.data.data.users
      })
    }).catch(err => {
      console.log(err)
    })
  }

  renderPosts() {
		console.log('loaded data', this.props)
		return this.state.apiData.map((el,i) => {
			return (
        <div>
        <p><img src={el.pic} alt="Pic"/> {el.user_name}<button>-</button></p>
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
    console.log('HANDLED')
  }

  render(){
    return (
      <div>
        <h1>Following the following Users:</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input type='text' name='user_name' onChange={this.handleInputChange} placeholder='Enter User Name' />
          <input type='submit' value="Enter User Name"/>
        </form>
      {/*  {this.state.fireRedirect ? <Redirect to='/icecream' /> : ''} */}
        {this.state.apiDataLoaded ? this.renderPosts() : ''}

      </div>
    )
  }
}

export default Following