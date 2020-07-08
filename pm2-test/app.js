const http = require('http')

const server = http.createServer((req, res) => {
  // 模拟日志
  console.log('记录日志', new Date());
  // 模拟错误
  console.error('假装出错', new Date);

  // 模拟一个错误
  if (req.url === '/err') {
    throw new Error('故意抛出错误')
  }

  res.setHeader('Content-type', 'application/json')
  res.end(JSON.stringify({
    errno: 0,
    msg: 'pm2 test server 2'
  }))
})

server.listen(8000)
console.log('server is listening on port 8000 ...');
