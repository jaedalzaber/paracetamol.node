const passport = require('passport');
const config = require('../config/config');

const User = require('../models/user');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20');

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.getToken = (user) => {
    let key = generateId();
    // redisClient.setex(user.tenantId + "_" + key, config.REFRESH_TOKEN_EXPIRATION_IN_SECONDS, JSON.stringify(user));

    let token = jwt.sign(
        user,
        config.secretKey,
        {
            expiresIn: config.TOKEN_EXPIRATION_IN_SECONDS,
            // algorithm: 'RS256'
        }
    );

    return {
        token: token,
        refreshToken: key
    };
};


passport.use(new LocalStrategy(User.authenticate()));

passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: "https://paracetamol-node.herokuapp.com/users/facebook/callback"
    // callbackURL: "http://localhost:3000/users/facebook/callback"
},
    function (accessToken, refreshToken, profile, done) {
        console.log('token', profile);
        User.findOne({ facebookId: profile.id }, function (err, user) {
            if (err) {
                console.log(err);
                return done(err, false);
            }
            else {
                if (user) {
                    return done(null, user);
                }
                else {
                    let newUser = new User({
                        username: profile.displayName
                    })
                    newUser.facebookId = profile.id;
                    newUser.username = profile.displayName;
                    newUser.save(function (err, user) {
                        if (err) {
                            return done(err, false);
                        }
                        else {
                            return done(null, user);
                        }
                    })
                }
            }
        });
    }
));

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_APP_ID,
    clientSecret: config.GOOGLE_APP_SECRET,
    callbackURL: 'https://paracetamol-node.herokuapp.com/users/google/callback',
    scope: ['profile'],
    state: true
},
    function verify(accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id }, function (err, user) {
            if (err) {
                console.log(err);
                return done(err, false);
            }
            else {
                if (user) {
                    return done(null, user);
                }
                else {
                    let newUser = new User({
                        username: profile.displayName
                    })
                    newUser.googleId = profile.id;
                    newUser.username = profile.displayName;
                    newUser.save(function (err, user) {
                        if (err) {
                            return done(err, false);
                        }
                        else {
                            return done(null, user);
                        }
                    })
                }
            }
        })
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

exports.generateRandomId = generateId = () => {
    const id = crypto.randomBytes(16).toString("hex");
    return id;
}

// Verify an incoming user with jwt strategy we just configured above   
exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyFB = passport.authenticate('facebook');