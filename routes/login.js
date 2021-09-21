const { response } = require('express');
var express = require('express');
var router = express.Router();
const userhelpers = require('../helpers/newuser-helpers')
/* GET login page. */
router.get('/', function (req, res, next) {
  if (req.session.loggedIn) {
    res.redirect('home')
  } else {
    res.render('login', { button: "Sign Up", action: "/signup", loginerr: req.session.loginError });
    req.session.loginError = false;
  }
});

router.post('/login', (req, res) => {
  // console.log(req.body); 
  userhelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/home')
    } else {
      req.session.loginError = "Invalid Username or Password"
      res.redirect('/')
    }
  })


})
module.exports = router;
