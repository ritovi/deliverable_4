const { getAll, create, getOne, remove, update, login, me } = require('../controllers/user.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');
const { getAllFavou, createFavou, removeFavou } = require('../controllers/favourite.controllers');

const routerUser = express.Router();

routerUser.route('/')
    .get(  verifyJwt  , getAll)
    .post(create);

routerUser.route("/login")
    .post(login)

routerUser.route("/me")
    .get(verifyJwt, me)

routerUser.route("/:user_id/posts")
    .get(verifyJwt, getAllFavou)
    .post(verifyJwt, createFavou)

routerUser.route("/:user_id/posts/:id")
    .delete(verifyJwt, removeFavou)


routerUser.route('/:id')
    .get(verifyJwt,getOne)
    .delete(verifyJwt,remove)
    .put(verifyJwt,update);

module.exports = routerUser;