var express = require('express');
let db = require('../db/db')
let { saveArticle,findArticle,findArticleDetails,updateOneArticle,deleteOneArticle } = require('../util/article')
var router = express.Router();

//添加文章
router.post('/add_article', async (req, res) => {
    try {
        await saveArticle(req.body)
        res.status(200).send({ data: { msg: 'ok' } })
    } catch (error) {
        console.log(error)
        res.status(200).send({ data: { msg: 'err' } })
    }
})

//获取所有文章
router.get('/article_list',async (req,res)=>{
    try {
        let query = {}
        if(req.query.labels)
        {
             //$all 用于数组查找
             query.labels = {$all:[req.query.labels]}
            console.log(query)
        }
        if(req.query.title)
        {
            //使用正则进行模糊查询
            query.title = {$regex:`/${req.query.title}/`}
        }
        let rel = await findArticle(query)
        console.log(rel)
        res.send({data:rel})
    }catch (e) {
        throw  e
        res.status(500).send()
    }

})
//获取文章详情
router.get('/article_detail',async (req,res)=>{
    console.log(req.query)
    let {id}= req.query
    let rel  = await  findArticleDetails(id)
    res.send({data:rel})
})
// 文章更新
router.post('/article_update',async  (req,res)=>{
    let data = req.body
    try {
        let rel = await  updateOneArticle(data)
        res.status(200).send({data:{msg:'ok'}})
    }catch (e) {
        res.status(200).send({data:{msg:'err'}})
    }
})
//删除文章
router.post('/delete_article', async (req,res)=>{
    let {id} = req.body
    try {
        let rel = await deleteOneArticle(id)
        res.send({data:{msg:'ok'}})
    }catch (e) {
        res.send({data:{msg:'err'}})
    }

})

router.post('/upload',(req,res)=>{
    console.log(req.body)
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Expose-Headers','*')
    res.send('ok')
})
module.exports = router;