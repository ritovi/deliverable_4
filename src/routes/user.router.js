const { getAll, create, getOne, remove, update, login, specialSetPosts, me } = require('../controllers/user.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerUser = express.Router();

routerUser.route('/')
    .get(  verifyJwt  , getAll)
    .post(create);

routerUser.route("/login")
    .post(login)

routerUser.route("/me")
    .get(verifyJwt, me)

routerUser.route("/:user_id/posts")
    .post(specialSetPosts)


routerUser.route('/:id')
    .get(verifyJwt,getOne)
    .delete(verifyJwt,remove)
    .put(verifyJwt,update);

module.exports = routerUser;