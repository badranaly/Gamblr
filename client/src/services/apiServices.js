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
		url: '/api/post',
		data: {
			content: thing.content,

		}
	})
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

services.removeFollowing = (id) => {
	console.log("remove", id)
	return axios.delete(`/api/users/follower/${id}`)
}


export default services
