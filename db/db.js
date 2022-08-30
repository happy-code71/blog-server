let mongoose = require("mongoose");

//连接数据库
mongoose.connect('mongodb://localhost:27017/myblog')

//创建文档结构
const articlesSchema = new mongoose.Schema({
    author: String,
    date: String,
    content: String,
    title: String,
    info: String,
    labels: Array
})

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    userinfo: String,
    userimg: String
})

//创建文档模型
const articles = mongoose.model('articles', articlesSchema)
const users = mongoose.model('users', usersSchema)
const model = {
    articles, users
}
module.exports = model