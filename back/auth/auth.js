const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.use('signup', new localStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
    try {
      const { avatar, handle } = req.query
      const user = await User.create({ email, avatar, password, handle })
      return done(null, user)
    } catch (error) {
      done(error)
    }
}));

passport.use('login', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if( !user ){
      return done(null, false, { message : 'User not found'});
    }
    const validate = await user.isValidPassword(password);
    if( !validate ){
      return done(null, false, { message : 'Wrong Password'});
    }
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));


const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new JWTstrategy({
  secretOrKey : 'top_secret',
  jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));

