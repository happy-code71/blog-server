var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
let { findUser } = require('../util/user')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 登录
router.post('/login', async function (req, res) {
  try {

    let userInfo = await findUser(req.body)
    console.log(req.body)
    if (userInfo.username == req.body.username && userInfo.password === req.body.password) {
      // 进行加密token
      // 秘钥
      const jwtKey = 'fjldsajfljasdlfjalsdkjfasjdlf'
      let token = jwt.sign({ username: userInfo.username }, jwtKey, (err, token) => {
        res.json({ data: { token ,username:userInfo.username,isOk:true }});
      })
    } else {
      res.status(200).send({data:{isOk:false}})
    }
  } catch (error) {
    console.log(error)
    res.status(404).send()
  }
})

router.get('/user_info', async (req, res) => {
  let token = req.header('authorization')
  console.log(token)
  try {
    // 秘钥
    const jwtKey = 'fjldsajfljasdlfjalsdkjfasjdlf'
    // 解密token
    var decoded = await jwt.verify(token, jwtKey)
    let { username } = decoded
    let userInfo = await findUser({ username })
    let {userinfo,userimg} = userInfo
    res.send({ data: {userinfo,userimg,username} })
  } catch (error) {
    throw error
    res.status(500).send()
  }


})
module.exports = router;
