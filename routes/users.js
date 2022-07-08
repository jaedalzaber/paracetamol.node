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
    const token = auth.getToken({ _id: req.user._id }).token;

    // Response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});


// Logout
router.get('/logout', (req, res) => {
    req.logout({ keepSessionInfo: false }, (err) => {
        if (err)
            console.log(err);
        else {
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
        }
    });
});

router.get('/facebook', auth.verifyFB, (req, res, next) => {
    
});


router.get('/facebook/callback', passport.authenticate('facebook'),
    function (req, res) {
    if (req.user) {
        let token = auth.getToken({ _id: req.user._id });
        console.log(token);
        res.cookie('jwt', token, { secure: true, httpOnly: true });
        res.cookie('adm', req.user.admin, { secure: true });
        res.cookie('user', req.user.username, { secure: true });
        // res.status(200).send();
    }
        res.redirect('/');
    }
);


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

