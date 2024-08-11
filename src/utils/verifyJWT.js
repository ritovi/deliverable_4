require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {

  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.SECRET_TOKEN,{
        //algorithms: ['HS256'],
        //issuer: 'issuer',
        //audience: 'audience',
        //subject: 'subject',
        //clockTolerance: 10,
        //ignoreExpiration: false
    },
    (err, decoded) => {
      if (err) {
        //console.log(err);
        return res.sendStatus(403);
      }
      req.user = decoded.user;
      next();
    }
  )

}

module.exports = { verifyJwt };