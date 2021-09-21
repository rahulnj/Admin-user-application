var express = require('express');
const { response } = require('../app');
var router = express.Router();
const userhelpers = require('../helpers/newuser-helpers')
router.get('/', (req, res, next) => {
    let admin = true;
    res.render('login', { admin })
})
router.post('/adminlogin', (req, res) => {
    // console.log(req.body);
    userhelpers.usersDetails().then((newusers) => {
        userhelpers.adminLogin(req.body).then((response) => {
            // console.log(newusers);
            if (response.status) {
                req.session.loggedin = true
                req.session.admin = response.admin
                res.render('admin/view-users', { button: "Log out", action: "/admin/signout", newusers })
            } else {

                res.redirect('/admin')
            }

        })
    })



})

router.get('/adduser', (req, res) => {
    res.render('admin/add-users', { nonav: true })
})
router.post('/create', (req, res) => {

    userhelpers.docreateUser(req.body).then((response) => {
        console.log(response);
    })
    res.redirect('/admin/adduser')
})
router.get('/signout', (req, res) => {
    req.session.destroy()
    res.redirect('/admin')
})


module.exports = router;