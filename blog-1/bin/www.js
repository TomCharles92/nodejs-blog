const http = require('http')
const PORT = 8000 // 前端页面请求的就是 8000
const serverHandle = require('../app')

const server = http.createServer(serverHandle)
server.listen(PORT)