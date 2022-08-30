let db = require('../db/db')
let ArticleApi = {}
// 文章保存
function saveArticle(data) {
    return db.articles(data).save()
}
// 获取所有文章
function findArticle(query){
    console.log(query)
    return db.articles.find(query)
}
//获取文章详情
function findArticleDetails(id){
    console.log(id)
    return db.articles.findById(id)
}
//文章更新
function  updateOneArticle(data){
    return db.articles.updateOne({_id:data._id},data)
}
//删除文章
function  deleteOneArticle(id){
    return db.articles.deleteOne({_id:id})
}
ArticleApi = { saveArticle ,findArticle,findArticleDetails,updateOneArticle,deleteOneArticle}
module.exports = ArticleApi