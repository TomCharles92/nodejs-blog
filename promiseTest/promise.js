const fs = require('fs')
const path = require('path')

function getFileContent(fileName) {
  return new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(JSON.parse(data.toString()))
    })
  })
}

getFileContent('a.json').then(aData => {
  console.log('a data', aData)
  return getFileContent(aData.next)
}).then(bData => {
  console.log('b data', bData);
  return getFileContent(bData.next)
}).then(cData => {
  console.log('c data', cData);
})