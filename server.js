const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const tokenService = require('./services/TokenService')
const authService = require('./services/AuthService')

const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`Listening on Sasha's port ${PORT}`)
})

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(tokenService.receiveToken)

const usersRoutes = require('./routes/userRoutes');
app.use('/api/users', usersRoutes)

const postsRoutes = require('./routes/postsRoutes');
app.use('/api/posts', postsRoutes)

app.get('/restricted', authService.restrict(), (req, res) => {
  res.json({msg: 'yay'});
})

app.get('/isLoggedIn', authService.isLoggedIn, (req, res) => {
  res.json({
    isLoggedIn: res.locals.isLoggedIn,
    token: tokenService.decode(req.authToken)
  });
});

app.get('/decodeToken', (req, res) => {
  res.json({token: tokenService.decode(req.authToken)})
})

app.get('*', function(req, res) {
  res.status(404).send({message: 'Oops! Not found.'});
});
