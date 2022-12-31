const path = require('path');
const jsonfile = require('jsonfile');

/** @type {Array} */
const file = jsonfile.readFileSync(path.join(__dirname, './topic2.json'))
const obj = {
  单选题: [],
  多选题: [],
  判断题: []
}

file.forEach(e => {
  e.question = e.title
  e.option=e.options
  e.answer=e.ans
  delete e.title
  delete e.options
  delete e.ans
  if (/【单选题】/.test(e.question)) {
    e.question = e.question.replace(/【单选题】/, '').trim()
    obj.单选题.push(e)
  } else if (/【多选题】/.test(e.question)) {
    e.question = e.question.replace(/【多选题】/, '').trim()
    obj.多选题.push(e)
  } else if (/【判断题】/.test(e.question)) {
    e.question = e.question.replace(/【判断题】/, '').trim()
    obj.判断题.push(e)
  } else console.log(e)
})
jsonfile.writeFileSync(path.join(__dirname, './topic1.json'), obj, { spaces: 2 })