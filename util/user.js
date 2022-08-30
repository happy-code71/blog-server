let db = require('../db/db')

//查找用户
let UserApi = {}
function findUser(info) {
    // let { username, password } = info
    return db.users.findOne({ ...info })
}
UserApi = {
    findUser
}
module.exports = UserApi