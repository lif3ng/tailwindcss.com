const child_process = require('child_process')
const status = require('../.trans-status')

console.log(status)

const changedFileList = child_process.execSync('git status -s').toString().split('\n')

const changeDoc = changedFileList
  .map((str) => {
    const matchRes = str.match(/M  (.+)/)
    const len = matchRes && matchRes.length
    if (len === 2 && matchRes[1].startsWith('src/pages/docs')) {
      return matchRes[1]
    }
    return null
  })
  .filter((x) => x)
console.log({ changeDoc })
