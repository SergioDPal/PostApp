"use strict";
require("dotenv").config();
const {LISTEN_PORT} = process.env;
const express = require("express");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const fs = require("fs");
const {extractMultipartFormData} = require("./src/middleware/extractRequest");

app.use(cors());
app.use(express.urlencoded({extended: false}));
// app.use(fileUpload());
app.use(morgan("tiny"));
app.use(express.json());

const {vote, deleteVote} = require("./src/controllers/votes");

const {
  getTokenIdOptional,
  ensureToken,
  isPassCorrect,
  isPostAuthor,
} = require("./src/middleware");

const {
  newUser,
  loginUser,
  getUserById,
  editUser,
  anonymizeUser,
} = require("./src/controllers/users");

const {
  getPost,
  postList,
  newPost,
  editPost,
  deletePost,
  userPostList,
} = require("./src/controllers/posts");
const {getImage} = require("./src/firebase/getImage");

app.post("/user", newUser);
app.post("/user/login", loginUser);
app.get("/user/:id", getTokenIdOptional, getUserById);
app.put(
  "/user/edit",
  extractMultipartFormData,
  ensureToken,
  isPassCorrect,
  editUser
);

// fields([
//   {name: "userName", maxCount: 1},
//   {name: "avatar", maxCount: 1},
//   {name: "password", maxCount: 1},
//   {name: "email", maxCount: 1},
//   {name: "oldPwd", maxCount: 1},
// ])
app.put("/user/delete", ensureToken, isPassCorrect, anonymizeUser);

app.post("/post", ensureToken, newPost);
app.get("/posts/user", ensureToken, userPostList);
app.get("/post/:id", getTokenIdOptional, getPost);
app.get("/posts", getTokenIdOptional, postList);
app.put("/post/:id", ensureToken, isPostAuthor, editPost);
app.delete("/post/:id", ensureToken, isPostAuthor, deletePost);

app.post("/post/:id/vote", ensureToken, vote);
app.delete("/post/:id/vote", ensureToken, deleteVote);

app.get("/avatar/:id", async (req, res) => {
  const firebaseURL = await getImage(req.params.id);
  res.redirect(firebaseURL);
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
});

app.use((req, res) => {
  res.status(404).send({status: "error", message: "Path not found."});
});

app.listen(LISTEN_PORT, () => {
  logger.info("Server is running.");
});

exports.app = onRequest(app);
