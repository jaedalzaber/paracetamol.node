const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const auth = require('../services/auth.service');


const router = express.Router();

// Get Users
router.get('/', auth.verifyUser, (req, res, next) => {
    // Get all records
    User.find({})
        .then((users) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            // format result as json
            res.json(users);
        }, (err) => next(err))
        .catch((err) => next(err));
});

// Register User
router.post('/signup', (req, res, next) => {
  // Create User
  User.register(new User({ username: req.body.username }),
      req.body.password, (err, user) => {
          if (err) {
            console.log(err, req.body);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({ err: err });
          }
          else {
              // Use passport to authenticate User
              passport.authenticate('local')(req, res, () => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json({ success: true, status: 'Registration Successful!' });
              });
          }
      });
});

// Login
router.post('/login', passport.authenticate('local'), (req, res, next) => {
    // Create a token
    const token = auth.getToken({ _id: req.user._id });

    // Response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});


// Logout
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});


module.exports = router;

// const Data = require('../models/data');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/api/server', (req, res, next)=>{
//   Data.find()
//     .then((documents)=>{
//       res.send(documents[0].message);
//     });
// })

