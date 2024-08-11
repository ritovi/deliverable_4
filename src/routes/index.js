const express = require('express');
const routerUser = require('./user.router');
const routerPost = require('./post.router');
const { verifyJwt } = require('../utils/verifyJWT');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)
router.use("/posts",  routerPost)

module.exports = router;