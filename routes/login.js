const { response } = require('express');
var express = require('express');
var router = express.Router();
const userhelpers = require('../helpers/newuser-helpers')
/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { button: "Sign Up", action: "/signup" });
});
router.post('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home')
  } else
    // console.log(req.body); 
    userhelpers.doLogin(req.body).then((response) => {
      if (response.status) {
        req.session.loggedIn = true
        req.session.user = response.user
        res.redirect('/home')
      } else {
        res.redirect('/')
      }
    })


})



module.exports = router;
