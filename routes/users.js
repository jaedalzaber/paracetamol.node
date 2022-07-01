var express = require('express');
var router = express.Router();

const Data = require('../models/data');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/server', (req, res, next)=>{
  Data.find()
    .then((documents)=>{
      res.send(documents[0].message);
    });
})

module.exports = router;
