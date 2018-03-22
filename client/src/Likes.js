//LetsGetit

import React, {Component} from 'react'
import services from './services/apiServices'
import Post from './Post'
import Header from './Header'
import Footer from './Footer'

class Likes extends Component {
	constructor() {
		super()
		this.state = {
			apiDataLoaded: false,
			apiData: null
		}
	}

	componentDidMount() {
		services.getAllLikes().then(like => {
			console.log(like,'likes')
			this.setState({
				apiDataLoaded: true,
				apiData: like.data.data.posts
			})
		}).catch(err => {
			console.log(err)
		})
	}

	renderLikes() {
		console.log('loaded likes')
		return this.state.apiData.map((el,i) => {
			return <Post key={el.id} post={el} list='favs'/>
		})
	}

  	render(){
        return (
      		<div>
      			<Header />
    			{this.state.apiDataLoaded ? this.renderLikes() : ''}
      			<Footer />
      		</div>
    	)
  	}
}

export default Likes
