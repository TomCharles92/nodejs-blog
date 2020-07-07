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

async function readFileData() {
  const aData = await getFileContent('a.json')
  console.log('a data', aData)
  const bData = await getFileContent(aData.next)
  console.log('b data', bData)
  const cData = await getFileContent(bData.next)
  console.log('c data', cData)
}
readFileData().then(res => {
  console.log("async 也会返回 promise，默认值是: ", res);
})