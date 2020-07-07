const fs = require('fs')
const path = require('path')

// callback 方式获取一个文件的内容
function getFileContent(fileName, callback) {
  // __dirname: 当前文件名，第二个参数：目标文件夹，第三个参数：目标文件名
  // 得到目标文件的绝对地址
  const fullFileName = path.resolve(__dirname, 'files', fileName)
  fs.readFile(fullFileName, (err, data) => {
    if (err) return console.log(err);

    // callback 的参数，通过回调函数传出去
    callback(JSON.parse(data.toString()))
  })
}

// 回调地狱
getFileContent('a.json', aData => {
  console.log('a data', aData);
  getFileContent(aData.next, bData => {
    console.log('b data', bData);
    getFileContent(bData.next, cData => {
      console.log('c data', cData);
    })
  })
})