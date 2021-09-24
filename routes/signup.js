var express = require('express');
const { response } = require('../app');
var router = express.Router();
const userhelpers = require('../helpers/newuser-helpers')

/* GET signup page. */
router.get('/', function (req, res, next) {
  if (req.session.loggedIn) {
    res.redirect('home')
  } else

    res.render('signup', { button: "Log In", action: "/", signuperr: req.session.signupError })
  req.session.signupError = false
});
router.post('/submit', async (req, res) => {

  const response = await userhelpers.checkUser(req.body.username)
  // console.log(req.body.username)
  // console.log(response);
  if (!response) {
    userhelpers.dosignup(req.body).then((response) => {
      // res.redirect('/')
    })


  } else
    req.session.signupError = "Username already taken"
  res.redirect('/signup')
})




module.exports = router;
