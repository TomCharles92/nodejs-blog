/* 文件的复制 */

var fs = require('fs')
var path = require('path')

var fileName1 = path.resolve(__dirname, 'data.txt')
var fileName2 = path.resolve(__dirname, 'data-copy.txt')

// 读取文件的 stream 对象
var readStream = fs.createReadStream(fileName1)
// 写入文件的 stream 对象
var writeStream = fs.createWriteStream(fileName2)
// 通过 pipe 来拷贝
readStream.pipe(writeStream)

// 当绑定监听器到 'data' 事件时，流会转换到流动模式。
readStream.on('data', chunk => {
  console.log(chunk.toString());
  
})
// 监听读取完成事件
readStream.on('end', function () {
  console.log('拷贝完成');

})