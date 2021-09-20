var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
const connection_string = 'mongodb://localhost:27017'
/* GET signup page. */
router.get('/', function (req, res, next) {
  res.render('signup')
});
router.post('/submit', (req, res) => {
  console.log(req.body);
  //mongo connection
  MongoClient.connect(connection_string, (err, client) => {
    if (err) {
      console.log('database error');
      throw error

    } else {
      console.log('database connected');
      var db = client.db('ecart')
      db.collection('newusers').insertOne(req.body)
    }
  })
  res.send('recieved')
})



module.exports = router;
