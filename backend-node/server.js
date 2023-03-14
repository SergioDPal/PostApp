'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT, UPLOADS_DIR } = process.env;
const fileUpload = require('express-fileupload');

const app = express();

const { vote, deleteVote } = require('./controllers/votes');

const {
  getTokenIdOptional,
  ensureToken,
  isPassCorrect,
  isPostAuthor,
} = require('./middleware');

const {
  newUser,
  loginUser,
  getUserById,
  editUser,
  anonymizeUser,
} = require('./controllers/users');

const {
  getPost,
  postList,
  newPost,
  editPost,
  deletePost,
  userPostList,
} = require('./controllers/posts');

app.use(express.json());
app.use(fileUpload());
app.use(express.static(UPLOADS_DIR));
app.use(cors());
app.use(morgan('tiny'));

app.post('/user', newUser);
app.post('/user/login', loginUser);
app.get('/user/:id', getTokenIdOptional, getUserById);
app.put('/user/edit', ensureToken, isPassCorrect, editUser);
app.put('/user/delete', ensureToken, isPassCorrect, anonymizeUser);

app.post('/post', ensureToken, newPost);
app.get('/posts/user', ensureToken, userPostList);
app.get('/post/:id', getTokenIdOptional, getPost);
app.get('/posts', getTokenIdOptional, postList);
app.put('/post/:id', ensureToken, isPostAuthor, editPost);
app.delete('/post/:id', ensureToken, isPostAuthor, deletePost);

app.post('/post/:id/vote', ensureToken, vote);
app.delete('/post/:id/vote', ensureToken, deleteVote);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).send({
    status: 'error',
    message: err.message,
  });
});

app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Path not found.',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
