'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT, UPLOADS_DIR } = process.env;
const fileUpload = require('express-fileupload');

// Creamos el servidor.
const app = express();

// Middleware que deserializa un body en formato "raw" creando la propiedad
// "body" en el objeto "request".
app.use(express.json());
app.use(fileUpload());
app.use(express.static(UPLOADS_DIR));
app.use(cors());

// llamamos a morgan

app.use(morgan('tiny'));

const {
  getTokenIdOptional,
  ensureToken,
  isPassCorrect,
  isPostAuthor,
} = require('./middleware');

/* #####################
 ####CONTROLADORES USER##
 #########################*/

const {
  newUser,
  loginUser,
  getUserById,
  editUser,
  deleteUser,
} = require('./controllers/users'); // controlador

// Crear un nuevo usuario.
app.post('/user', newUser); // esto es un middleware el conjunto de funciones

// Login de usuario.
app.post('/user/login', loginUser); // users/login es el end-point donde va la peticion

// Obtener información de un usuario. Devuelve más datos si es el usuario del token.
app.get('/user/:id', getTokenIdOptional, getUserById);

// Editar información del usuario:
app.put('/user/edit', ensureToken, isPassCorrect, editUser);

// Anonimizar usuario. Se conservan sus posts y votos y se muestran con autor eliminado:
app.put('/user/delete', ensureToken, isPassCorrect, deleteUser);

/* #####################
 ####CONTROLADORES POST##
 #########################*/
const {
  getPost,
  listPost,
  newPost,
  editPost,
  deletePost,
  userPostList,
} = require('./controllers/posts'); // controlador

// Crear un nuevo post.
app.post('/post', ensureToken, newPost);

// Obtener listado post del usuario.
app.get('/posts/user', ensureToken, userPostList);

// Obtener información del post.
app.get('/post/:id', getTokenIdOptional, getPost);

// lista de posts.
app.get('/posts', getTokenIdOptional, listPost);

// edit post. token req
app.put('/post/:id', ensureToken, isPostAuthor, editPost);

// borrar post. Sólo creador.
app.delete('/post/:id', ensureToken, isPostAuthor, deletePost);

/* #####################
 ####CONTROLADORES Votes##
 #########################*/

const { vote, deleteVote } = require('./controllers/votes');

// Lanzamos un voto. Si la entrada no existe, se crea.
// En caso de que el voto sea diferente al previo, actualizamos el valor.
app.post('/post/:id/vote', ensureToken, vote);

// Borrar voto.
app.delete('/post/:id/vote', ensureToken, deleteVote);

/* #####################
 ####MIDDLEWARE DE ERRORES##
 #########################*/

// Middleware de error.
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).send({
    status: 'error',
    message: err.message,
  });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Ruta no encontrada',
  });
});

//-------------------*************-------------------///
// Ponemos el servidor a escuchar peticiones en un puerto dado.
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
