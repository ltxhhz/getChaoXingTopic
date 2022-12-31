//脚本用来在网页导入题库

const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

/** @type {Array} */
const file = jsonfile.readFileSync(path.join(__dirname, './topic2.json'))
const obj = {
  单选: [],
  多选: [],
  判断: []
}
let str = '', i = 1

const p = (s = ' ') => `<p>${s}</p>`
const ind = () => i + '.'

file.forEach(e => {
  if (/【单选题】/.test(e.title)) obj.单选.push(e)
  else if (/【多选题】/.test(e.title)) obj.多选.push(e)
  else if (/【判断题】/.test(e.title)) obj.判断.push(e)
  else console.log(e)
})

obj.单选.forEach(e => {
  str += p(ind() + e.title)
  for (const k in e.options) {
    str += p(`${k}.${e.options[k]}`)
  }
  str += p(`答案:${e.ans}`)
  str += p()
})
obj.多选.forEach(e => {
  str += p(ind() + e.title)
  for (const k in e.options) {
    str += p(`${k}.${e.options[k]}`)
  }
  str += p(`答案:${e.ans}`)
  str += p()
})
obj.判断.forEach((e, i, a) => {
  str += p(ind() + e.title)
  str += p(`答案:${e.ans == '×' ? '错' : '对'}`)
  str += i == a.length - 1 ? p('') : p()
})
fs.writeFileSync(path.join(__dirname, './p.txt'), str)