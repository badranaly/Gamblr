# Gamblr Proposal

## Deployment
Deployed on Heroku: https://ga-mblr.herokuapp.com

## What is Gamblr?

Gamblr is a mock tumblr. It is a social media app in which users can post content, follow other users, comment on user's posts, and like the posts as well.  

## Technologies Used

Node.js/Express - backend
React - frontend
Bootstrap - styling
TokenAuthorization - login
React Player - embed videos

## General Approach

We first drew out lists and diagrams of what we were planning on including in Gamblr. This included many lists of different types of posts.

We then split our group into two with each group working on front or back end. The backend had to finish writing the basic functions so the frontend could properly start working and testing.  We continued to work that way and gradually we each found more specific parts we each became in charge of.

The last bits of the project were merging the login authorization with our working app and styling.

## Installation Instructions

within GAmblr directory
	npm install

within client directory
	npm install / yarn install

## Wireframe

https://invis.io/5CGE7XHGD63#/285701039_Home

## ERD

https://github.com/HardingRU/GAmblr/blob/master/proposal/GAMBLR-ERD.png

## User Story

The users of this app is any person who wants to share content with others. 
First the user will see the login page where he/she can login or signup for a new account.  Once logged in, he/she will have the option to post a new post. They can also view other users and decide to follow them or not.  Once following, posts will appear in one's feed and can be liked or viewed and commented on. Others can follow you and view your posts as well.  Each user gets their own userpage where they can customize their page by including a profile pic, background pic, blog name, and blog description. The user can view other lists by clicking on the 'Account' dropout and clicking the options.

## Unsolved Problem or Hurdles

Our biggest hurdle as a group was probably trying to figure out git in general. With some help, we also struggled with creating a set structure as to how each member would push and pull from the dev. 

The struggles for the rest of the project were already expected because we knew we were making a whole social media app with a lot of the basic properties. There were a lot of things to be considered. Planning really helped with the organization of what we wanted to include in this project.

## Initial thoughts on app structure

Tables for users, posts, comments, likes, and followers.

App will require the following pages:
- Login
- Create Account
- Home (Logged-in)
- Activity
- View Single Post
- User Page
- Account:
  - likes
  - following
  - posts
  - followers
  - settings
  - appearance
- Post

## Phases of Completion

1. Proposal, planning, basic scaffolding
2. Build out databases/models
3. Build controllers
4. Build out react components
5. QA
6. Styling
7. Deployment

## Links and Resources
1. Tumblr App
