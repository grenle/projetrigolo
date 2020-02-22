const express  = require('express');
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const router   = express.Router();

module.exports = router.post('/', async (req, res, next) => {
  console.log('POST /api/login/')
  passport.authenticate('login',
			async (err, user, info) => {
        try {
          if(err || !user){
            const error = new Error('An Error occurred')
            return next(error);
          }
          req.login(user, { session : false }, async (error) => {
            if( error ) return next(error)
            const body = { _id : user._id, email : user.email };
            const token = jwt.sign({ user : body },'top_secret');
            r = {_id: body._id, token: token, email: body.email }
            return res.json({ sucess: true, data: r });
          });
        } catch (error) {
          return next(error);
        }
      })(req, res, next);
});