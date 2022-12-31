//旧版页面导出
let data = {
  单选题: [],
  多选题: [],
  判断题: []
}
Array.from(document.querySelectorAll(".TiMu"))
  .forEach(e => {
    let question = e.querySelector('.Zy_TItle>div>div:nth-child(1)').innerText
    let answer = e.querySelector('.Py_answer').querySelector('span:nth-child(1)').innerHTML.replace(/<[^>]*>|<\/[^>]*>/gm, '').trim().match(/：\s?(\S+)$/)[1]
    if (/^\w+$/.test(answer)) {//选择
      let option = Array.from(document.querySelector(".TiMu").querySelector('.Zy_ulTop').children).map(e => e.innerHTML.replace(/<[^>]*>|<\/[^>]*>/gm, '').trim())
      data[answer.length == 1 ? '单选题' : '多选题'].push({
        question,
        option,
        answer
      })
    } else {//判断
      data.判断题.push({
        question,
        answer
      })
    }
  })