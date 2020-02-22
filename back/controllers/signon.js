const express  = require('express');
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const router   = express.Router();

module.exports = router.post('/', async (req, res, next) => {
  passport.authenticate('login',
    async (err, user, info) => {
      try {
        if(err || !user){
          const error = new Error('An Error occurred')
          return next(error);
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          const body = {
            _id : user._id,
            email : user.email,
          };
          const token = jwt.sign({ user : body },'top_secret');
          /**
           * TODO clean body and 'r' up
           * clone the user object
           * remove the password from clone
          */
          r = {
            _id: body._id,
            token: token,
            email: body.email,
            avatar: user.avatar,
            handle: user.handle
          }
          return res.json({ success: true, data: r });
        });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});