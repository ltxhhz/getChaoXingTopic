const jsonfile = require('jsonfile');
require('colors')

const topic = jsonfile.readFileSync('./topic.json')
const topic1 = jsonfile.readFileSync('./topic1.json')

// if (!topic.questions) topic.questions = []
const num = [0, 0, 0]
for (const key in topic1) {
  if (Object.hasOwnProperty.call(topic1, key)) {
    num[2] += topic[key].length
    /**@type array */
    const q = topic1[key];
    q.forEach((value, index) => {
      try {
        value.question = value.question.trim()
      } catch (error) {
        debugger
      }
      if (!topic.questions.includes(value.question)) {
        topic.questions.push(value.question)
        topic[key].push(value)
        num[0]++
      } else {
        num[1]++
        console.log(`${value.question.blue} 已存在`);
      }
    })
  }
}
num[2] += num[0]
console.log(`新增 ${String(num[0]).yellow} 条，${String(num[1]).yellow} 条已存在`);
console.log(`当前 ${String(num[2]).yellow} 条`);
jsonfile.writeFileSync('./topic.json', topic, { spaces: 2 })