/* 使用 GET 方法，在页面上打印文件流 */

const http = require('http')
const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname, 'data.txt')

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const readStream = fs.createReadStream(fileName1)
    readStream.pipe(res) // 将请求中的流，输出到响应中
  }
})

server.listen(8020)