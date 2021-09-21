var express = require('express');
var router = express.Router();
const userhelpers = require('../helpers/newuser-helpers')
router.get('/', (req, res, next) => {
    let admin = true;
    res.render('login', { admin })
})
router.post('/adminlogin', (req, res) => {
    res.render('admin/view-users',)
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