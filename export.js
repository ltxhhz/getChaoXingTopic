const data = {}
Array.from(document.querySelector("div.swiper-pages.swiper-container > div.swiper-wrapper").children).forEach(v => {
  /**
   * @type string
   */
  let answer = v.getElementsByClassName('greenColor')[0].innerText //答案
  let type = v.getElementsByClassName('stemGray')[0].innerText.match(/\((.+题)/)[1] //题目类型
  let question = v.getElementsByClassName('Picdiv')[0].innerText //问题
  let option = Array.from(v.querySelectorAll('.optionDiv>.optionCon>.ptag')).map(e => e.innerText)
  if (!data[type]) data[type] = []
  let result = {
    question,
  }
  if (type != '判断题') result.option = option
  else answer=/[对|错]/.exec(answer)+''
  result.answer=answer
  data[type].push(result)
})
console.log(data)