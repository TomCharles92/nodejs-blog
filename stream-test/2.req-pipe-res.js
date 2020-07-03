/* 将POST请求的数据，返回 */

const http = require('http')
const server = http.createServer((req, res) => {
  if(req.method === 'POST') {
    req.pipe(res) // 将请求中的流，输出到响应中
  }
})

server.listen(8020)