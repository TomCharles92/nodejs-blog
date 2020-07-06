const http = require("http")
const querystring = require("querystring")

// const server = http.createServer((req, res) => {
//   console.log('method: ', req.method);
//   const url = req.url;
//   console.log('url: ', url);

//   req.query = querystring.parse(url.split("?")[1]); // request并没有query这个属性
//   console.log('query: ', req.query);
//   res.end(JSON.stringify(req.query));
// })

// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     console.log('req content-type: ', req.headers['content-type']);
//     // 接收数据
//     let postData = ''
//     req.on('data', chunk => {
//       postData += chunk.toString()
//     })
//     req.on('end', () => {
//       console.log('postData', postData);
//       res.end('Hello World!')
//     })

//   }
// })

const server = http.createServer((req, res) => {
  const {
    method,
    url
  } = req;
  const path = url.split('?')[0];
  const query = url.split('?')[1];

  res.setHeader('Content-type', 'application/json')

  const resData = {
    method,
    url,
    path,
    query
  }

  // 返回
  if (method === 'GET') {
    res.end(JSON.stringify(resData));
  } else if (req.method === 'POST') {
    console.log('req content-type: ', req.headers['content-type']);
    // 接收数据
    let postData = ''
    // post 传输数据事件
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    // post 传输结束
    req.on('end', () => {
      console.log('postData', postData);
      res.end('Hello World!')
    })
  }
})


server.listen(8000)
console.log("server listening on 8000!!! ")