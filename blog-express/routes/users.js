var express = require('express');
var router = express.Router();

/* GET users listing. */
// url：localhost:3000/users/
// 父路径：/users
// 当前子路径：/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
