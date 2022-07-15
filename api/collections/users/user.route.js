const awilix = require('awilix-express');
const express = require('express');

const UserController = require('./user.controller');
const auth = require('../../../services/auth.service');

const router = express.Router();

const api = awilix.makeInvoker(UserController);


router.get('/', auth.verifyUser, api('get'));

module.exports = router;

