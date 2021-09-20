var express = require('express');
var router = express.Router();

/* GET signup page. */
router.get('/', function (req, res, next) {
  res.render('signup')
});
router.post('/submit', (req, res) => {
  console.log(req.body);
})
module.exports = router;
