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

services.authenticateUser = (username, password) => {
    return axios.get(`api/users/${username}`)({
        method: 'GET',
        url: `/api/users/${username}`,
        data: {
            user_name: username,
            password: password
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

export default services
