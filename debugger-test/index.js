// package.json 中 "main": "index.js"
// index.js 作为入口文件
console.log(100)
console.log(200)
console.log(300)
console.log(400)
console.log(500)


const http = require("http")

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/html'
  })
  res.end('<h1>Hello World!</h1>')
})

server.listen(3000, () => {
  console.log('listening on 3000 port');
})