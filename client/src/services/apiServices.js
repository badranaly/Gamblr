//Lillian
import axios from 'axios'
const services = {}

services.getUser = (username) => {
	return axios.get(`/api/users/user/${username}`)
}

services.getPost = (id) => {
	return axios.get(`api/posts/post/${id}`)
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
	console.log("inside delete users")
	console.log(username)
	return axios.delete(`/api/users/users/${username}`)
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

services.addLike = (thing) => {
	return axios({
		method: 'POST',
		url: '/api/posts/like',
		data: {
			user_id: thing.user_id,
			post_id: thing.post_id
		}
	})
}

services.removeLike = (postId,userId) => {
	return axios.delete(`/api/posts/like/${postId}/${userId}`)
}

services.subtractLike = (postId) => {
	return axios.delete(`/api/posts/subtractLike/${postId}`)
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

services.getUserPage = (username) => {
	return axios.get(`/api/posts/user/${username}`)
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
	return axios.get(`/api/users/checkFollowing/${id}`)
}

services.checkLikes = (user,id) => {
	return axios.get(`/api/posts/checkLikes/${id}/${user}`)
}

services.singlePost = (id) => {
	return axios.get(`/api/posts/singlePost/${id}`)
}

services.getComments = (id) => {
	return axios.get(`/api/posts/getComments/${id}`)
}

services.addComment = (id, comment) => {
	return axios({
		method: 'POST',
		url: `/api/posts/comment/${id}`,
		data: {
			content: comment
		}
	})
}

services.removeLikesByUser = (id) => {
	return axios.delete(`/api/users/users/likes/${id}`)
}

services.removeFollowByUser = (id) => {
	return axios.delete(`/api/users/users/follower/${id}`)
}

services.removePostsByUser = (id) => {
	return axios.delete(`/api/users/users/posts/${id}`)
}

services.removeCommentsByUser = (id) => {
	return axios.delete(`/api/users/users/comments/${id}`)
}


export default services
