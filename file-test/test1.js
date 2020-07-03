const fs = require('fs')
const path = require('path')

// __dirname: 当前文件的路径
// 得到绝对路径
const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
fs.readFile(fileName, (err, data) => {
  if (err) return console.log(err)
  console.log(data.toString());

})

// 写入文件
const content = '这是新写入的内容\n'
const opt = {
  flag: 'a' // a：追加，w：覆盖
}
fs.writeFile(fileName, content, opt, (err) => {
  if (err) return console.log(err);
})

// 判断文件是否存在
fs.exists(fileName, exist => {
  console.log('exist: ', exist);

})