var express = require('express');
var router = express.Router();
const userhelpers = require('../helpers/newuser-helpers')

/* GET signup page. */
router.get('/', function (req, res, next) {
  res.render('signup', { button: "Log In", action: "/" })
});
router.post('/submit', (req, res) => {
  userhelpers.dosignup(req.body).then((response) => {
    console.log(response);
  })
  // res.send('Recieved')
})




module.exports = router;
