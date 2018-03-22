//Lillian
import axios from 'axios'
const services = {}

//user manipulation
services.getUser = (username) => {
	return axios.get()
}

services.createUser = (things) => {
	return axios({
		method: 'POST',
		url: '/api/users',
		data: {
			user_name: things.user_name,
			password: things.password,
			pic: things.pic,
			bg: things.bg,
			blog_name: things.blog_name,
			blog_desc: things.blog_desc
		}
	})
}

services.updateUserInfo = (things,username) => {
	return axios({
		method: 'PUT',
		url: `/api/users/${username}`,
		data: {
			password: things.password
		}
	})
}

services.updatePassword = (obj) => {
	console.log('inside services for password', obj)
	return axios({
		method: 'PUT',
		url: `/api/users/settings`,
		data: {
			password: obj.password,
		}
	})
}

services.updateAppearance = (things,username) => {
	return axios({
		method: 'PUT',
		url: `/api/users/${username}`,
		data: {
	    user_name: things.user_name,
	    pic: things.pic,
	    bg: things.bg,
	    blog_name: things.blog_name,
	    blog_desc: things.blog_desc
	  },
	})
}

services.deleteUser = (username) => {
	return axios.delete(`/api/users/${username}`)
}

services.authenticateUser = (things) => {
    return axios({
        method: 'POST',
        url: `/api/users/login`,
        data: {
					user_name: things.user_name,
					password: things.password
				}
    })
}

//post manipulation

services.getAllPosts = () => {
	return axios.get('/api/posts/feed')
}
services.createOnePost = (thing) => {
	return axios({
		method: 'POST',
		url: '/api/posts',
		data: {
			type: thing.type,
			content: thing.content,
			user_id: thing.user_id,
			notes: thing.notes
		}
	})
}

services.getAllMyPosts = () => {
	return axios.get('/api/posts/myPosts')
}

services.getAllLikes = () => {
	return axios.get('/api/posts/like')
}

services.getFollowing = () => {
	return axios.get(`/api/users/following`)
}

services.getFollowers = () => {
	return axios.get(`/api/users/followers`)
}

services.getUserID = (user_name) => {
	return axios.get(`/api/users/lookup/${user_name}`)
}

services.addFollowing = (user) => {
	return axios({
		method: 'POST',
		url: `/api/users/follower/`,
		data: {
			content: user,

		}
	})
}

services.followNew = (id) => {
	console.log("inservice", id.data.data.user[0].id)
	return axios({
		method: 'POST',
		url: `/api/users/follower/${id.data.data.user[0].id}`,
		data: {
			content: id,
		}
	})
}

services.removeFollowing = (id) => {
	return axios.delete(`/api/users/follower/${id}`)
}

services.checkFollowing = (id) => {
	return axios.get(`api/users/checkFollowing/${id}`)
}

services.singlePost = (id) => {
	return axios.get(`api/posts/singlePost/${id}`)
}


export default services
