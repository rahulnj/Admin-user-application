var express = require('express');
const { response } = require('../app');
var router = express.Router();
const userhelpers = require('../helpers/newuser-helpers')
router.get('/', (req, res, next) => {

    res.render('login', { admin: true })
})

router.post('/viewusers', (req, res) => {
    userhelpers.adminLogin(req.body).then((response) => {
        userhelpers.usersDetails().then((newusers) => {
            req.session.loggedin = true

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


router.get('/viewusers', (req, res) => {
    userhelpers.usersDetails().then((newusers) => {
        res.render('admin/view-users', { button: "Log out", action: "/admin/signout", newusers })
    })
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


router.get('/delete-user/:id', (req, res) => {
    let userId = req.params.id
    userhelpers.deleteUser(userId).then((response) => {
        res.redirect('/admin/viewusers')
    })
})

router.get('/edit-user/:id', async (req, res) => {
    let user = await userhelpers.editUsers(req.params.id)
    console.log(user);
    res.render('admin/edit-users', { nonav: true, user })
})

router.post('/edit-user/:id', (req, res) => {
    userhelpers.updateUser(req.params.id, req.body).then(() => {
        res.redirect('/admin/viewusers')
    })
})

module.exports = router;