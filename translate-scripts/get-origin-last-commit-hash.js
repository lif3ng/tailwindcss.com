const child_process = require('child_process')
const fs = require('fs')
const path = require('path')
const gitlog = require('gitlog').default

const status = require('./.trans-status')

console.log(status)

const changedFileList = child_process.execSync('git status -s').toString().split('\n')

const changeDocs = changedFileList
  .map((str) => {
    const matchRes = str.match(/M  (.+)/)
    const len = matchRes && matchRes.length
    if (len === 2 && matchRes[1].startsWith('src/pages/docs')) {
      return matchRes[1]
    }
    return null
  })
  .filter((x) => x)
console.log({ changeDocs })
changeDocs.forEach((file) => {
  if (!status[file]) {
    const [{ hash }] = gitlog({ repo: '.', fields: ['hash'], file, number: 3 })
    console.log({ file, hash })
    status[file] = hash
  }
})

console.log(status)

fs.writeFileSync(path.join(__dirname, '.trans-status.json'), JSON.stringify(status, null, 2))
