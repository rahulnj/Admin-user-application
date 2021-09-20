var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login',);
});



module.exports = router;
