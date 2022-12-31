const jsonfile = require('jsonfile');
const path = require('path');
const fs = require('fs');
require('colors')
const mainFile = './topic.json'
const tempFile = './topic1.json'

const topic = jsonfile.readFileSync(jsonExist(path.join(__dirname, mainFile)))
const topic1 = jsonfile.readFileSync(jsonExist(path.join(__dirname, tempFile)))

function jsonExist(p) {
  if (!fs.existsSync(p)) jsonfile.writeFileSync(p, {})
  return p
}

if (!topic.index) topic.index = []
const num = [0, 0, 0]
for (const key in topic1) {
  if (!topic[key]) topic[key] = []
  num[2] += topic[key].length
  /**@type array */
  const q = topic1[key];
  q.forEach((value, index) => {
    try {
      value.question = value.question.trim()
    } catch (error) {
      debugger
    }
    if (!topic.index.includes(value.question)) {
      topic.index.push(value.question)
      topic[key].push(value)
      num[0]++
    } else {
      num[1]++
      console.log(`${value.question.blue} 已存在`);
    }
  })
}
num[2] += num[0]
console.log(`新增 ${String(num[0]).yellow} 条，${String(num[1]).yellow} 条已存在`);
console.log(`当前 ${String(num[2]).yellow} 条`);
jsonfile.writeFileSync(path.join(__dirname,mainFile), topic, { spaces: 2 })