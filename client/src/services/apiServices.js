//Lillian
import axios from 'axios'
const services = {}

services.getAllPosts = () => {
	return axios.get()
}

services.getUser = (username) => {
	return axios.get()
}

services.updateUserInfo = (things,username) => {
	return axios({
		method: 'PUT',
		url: `api/ /${username}`,
		data: {
			user_name: things.user_name,
			password: things.password
		}
	})
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

export default services