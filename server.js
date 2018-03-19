const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const PORT = proccess.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`Listening on Sasha's port ${PORT}`)
})

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const usersRoutes = require('./routes/usersRoutes');
app.use('/api/users', usersRoutes)

const postsRoutes = require('./routes/postsRoutes');
app.use('/api/posts', postsRoutes)

app.get('*', function(req, res) {
  res.status(404).send{message: 'Oops! Not found.'});
});
