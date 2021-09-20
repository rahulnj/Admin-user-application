const MongoClient = require('mongodb').MongoClient

const state = {
    db: null
}
module.exports.connect = (done) => {
    const connection_url = 'mongodb://localhost:27017'
    const dbname = 'ecart'

    MongoClient.connect(connection_url, (err, data) => {
        if (err) return done(err)
        state.db = data.db(dbname)
        done()

    })
}

module.exports.get = function () {
    return state.db
}