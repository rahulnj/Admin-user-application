var express = require('express');
var router = express.Router();

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


module.exports = router;