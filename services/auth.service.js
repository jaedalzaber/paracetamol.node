const passport = require('passport');
const config = require('../config');

const User = require('../models/user');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy

const jwt = require('jsonwebtoken');
exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};


passport.use(new LocalStrategy(User.authenticate()));

passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: "https://paracetamol-node.herokuapp.com/"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretKey
};


exports.jwtPassport = passport.use(new JwtStrategy(options,
    // The done is the callback provided by passport
    (jwt_payload, done) => {

        // Search the user with jwt.payload ID field
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            // Have error
            if (err) {
                return done(err, false);
            }
            // User exist
            else if (user) {
                return done(null, user);
            }
            // User doesn't exist
            else {
                return done(null, false);
            }
        });
    }));

// Verify an incoming user with jwt strategy we just configured above   
exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyFB = passport.authenticate('facebook',{scope:'email'});