var express = require('express');
const { response } = require('../app');
var router = express.Router();
const userhelpers = require('../helpers/newuser-helpers')
router.get('/', (req, res, next) => {
    let admin = true;
    res.render('login', { admin })
})
router.post('/adminlogin', (req, res) => {
    console.log(req.body);
    userhelpers.adminLogin(req.body).then((response) => {
        if (response.status) {
            res.redirect('admin/view-users',)
        } else {
            res.redirect('/admin')
        }

    })


})




router.get('/adduser', (req, res) => {


    res.render('admin/add-users')


})
router.post('/create', (req, res) => {

    userhelpers.docreateUser(req.body).then((response) => {
        console.log(response);
    })
    res.redirect('/admin/adduser')
})


module.exports = router;