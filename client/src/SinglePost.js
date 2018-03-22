import React, {Component} from 'react'
import services from './services/apiServices'

class Follower extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
    }
  }

  componentDidMount() {
    console.log("Mounted")
    console.log(this.props.match.params.id)
    services.singlePost(this.props.match.params.id)
    .then(post => {
      console.log(post)
    })
    .catch(err => {
      console.log(err)
    })
    this.setState({
      apiDataLoaded: true
    })
  }

  renderPage() {

          return (
            <div>
              <p>Post</p>
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

export default Follower
