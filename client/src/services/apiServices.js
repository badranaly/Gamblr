//Lillian
import axios from 'axios'
import TokenService from './TokenService'

const services = {}

services.getUser = (username) => {
	return axios.get(`/api/users/user/${username}`)
}

services.getPost = (id) => {
	return axios.get(`/api/posts/post/${id}`)
}

services.register = (things) => {
	console.log('this is things -> ', things);
	return axios('http://localhost:3000/api/users/signup', {
    method: "POST",
    data : things
  })
}

services.getAllLikes = (user) => {
	return axios.get(`/api/posts/like/${user}`)
}

services.login = (things) => {
	return axios('http://localhost:3000/api/users/login', {
    method: "POST",
    data : things
  })
}

services.checkLogin = (token) => {
	return axios('http://localhost:3000/isLoggedIn', {
    headers: {
      Authorization: `Bearer ${TokenService.read()}`
			}
    })
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

services.userLogin = (user, pass) => {
	return axios.get(`/api/users/login/${user}/${pass}`)
}

services.updatePassword = (obj) => {
	console.log('inside services for password', obj)
	return axios({
		method: 'PUT',
		url: `/api/users/settings`,
		data: {
			password: obj.password,
			username: obj.username
		}
	})
}

services.updateAppearance = (things,username) => {
	return axios({
		method: 'PUT',
		url: `/api/users/${username}`,
		data: {
			username: username,
	    pic: things.pic,
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
	console.log('inside services...')
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

services.getAllPosts = (input) => {
	return axios.get(`/api/posts/feed/${input}`)
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

services.getAllMyPosts = (input) => {
	return axios.get(`/api/posts/myPosts/${input}`)
}

//services.getAllLikes = () => {
//	return axios.get('/api/posts/like')
//}

services.addLike = (thing, thing2) => {
	return axios({
		method: 'POST',
		url: '/api/posts/like',
		data: {
			user_id: thing2,
			post_id: thing.post_id
		}
	})
}

services.removeLike = (postId,userId) => {
	return axios.delete(`/api/posts/like/${postId}/${userId}`)
}

services.subtractLike = (postId) => {
//	return axios.delete(`/api/posts/subtractLike/${postId}`)

	return axios({
		method: 'PUT',
		url: `/api/posts/subtractLike/${postId}`,
		data: {
			post_id: postId
		},
	})
}

services.getFollowing = (input) => {
	return axios.get(`/api/users/following/${input}`)
}

services.getFollowers = (input) => {
	return axios.get(`/api/users/followers/${input}`)
}

services.getUserID = (user_name) => {
	return axios.get(`/api/users/lookup/${user_name}`)
}

services.getUserPage = (username) => {
	return axios.get(`/api/posts/user/${username}`)
}

services.addFollowing = (user, logged) => {
	let helpObj = {}
	helpObj.user = user
	helpObj.logged = logged
	return axios({
		method: 'POST',
		url: `/api/users/follower`,
		data: {
			content: helpObj

		}
	})
}

services.followNew = (id, two) => {
	let helpObj = {}
	helpObj.one = id.data.data.user[0].id
	helpObj.two = two
	return axios({
		method: 'POST',
		url: `/api/users/follower/${id.data.data.user[0].id}/${two}`,
		data: {
			content: helpObj,
		}
	})
}

services.removeFollowing = (id, logged) => {
	return axios.delete(`/api/users/follower/${id}/${logged}`)
}

services.checkFollowing = (id, id2) => {
	return axios.get(`/api/users/checkFollowing/${id}/${id2}`)
}

services.checkLikes = (user,id) => {
	console.log("checking likes in services", user)
	console.log("checking likes in services", id)
	return axios.get(`/api/posts/checkLikes/${id}/${user}`)
}

services.singlePost = (id) => {
	return axios.get(`/api/posts/singlePost/${id}`)
}

services.getComments = (id) => {
	return axios.get(`/api/posts/getComments/${id}`)
}

services.addComment = (id, comment, user) => {
	return axios({
		method: 'POST',
		url: `/api/posts/comment/${id}/${user}`,
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
