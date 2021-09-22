var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const { response } = require('../app')
var objectId = require('mongodb').ObjectId
module.exports = {
    dosignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data.ops[0])
            })

        })
    },
    docreateUser: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data.ops[0])
            })

        })
    },
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ username: userData.username })
            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        // console.log("login success");
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        // console.log("login failed");
                        resolve({ status: false })
                    }
                })
            } else {
                // console.log("login failed");
                resolve({ status: false })
            }
        })
    },
    adminLogin: (adminData) => {
        return new Promise(async (resolve, reject) => {
            let loginstatus = false
            let response = {}
            let admin = await db.get().collection(collection.ADMIN_COLLECTION).findOne({ username: adminData.username })
            if (admin) {
                bcrypt.compare(adminData.password, admin.password).then((Status) => {
                    if (Status) {
                        console.log("login success");
                        response.admin = admin
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("login failed");
                        resolve({ Status: false })
                    }
                })
            } else {
                console.log("login failed");
                resolve({ Status: false })
            }
        })
    },
    usersDetails: () => {
        return new Promise(async (resolve, reject) => {
            let newusers = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(newusers)
        })
    },
    deleteUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).remove({ _id: objectId(userId) }).then((response) => {
                resolve(response)

            })
        })
    }


}