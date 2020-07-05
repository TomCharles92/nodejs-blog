const express = require('express')
const router = express.Router()

router.get('/list', function (req, res, next) {
  // 1. 以 json 格式返回数据
  // 2. 添加 headers Content-Type: application/json;
  res.json({
    errno: 0,
    data: [12, 123, 232]
  })
})

router.get('/detail', function (req, res, next) {
  res.json({
    errno: 0,
    data: 'OK'
  })
})

module.exports = router