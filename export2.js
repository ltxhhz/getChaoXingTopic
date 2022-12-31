Array.from(document.querySelectorAll('.TiMu')).map(e => {
  let title = e.querySelector('.Zy_TItle>div').innerText.trim()
  let type = /^【(.+)】/.exec(title)[1]
  let answer
  if (type == '填空题') {
    answer = e.querySelector('.Py_tk>div')?.innerText || e.querySelector('div.Py_answer > span.font14').innerText
  } else if (type == '判断题') {
    answer = e.querySelector('.Py_answer>span').innerText.match(/正确答案：\s*(.+)/)[1].trim()
  } else if (type == '简答题') {
    answer = e.querySelector('.Py_answer>span').innerText
  } else {
    answer = e.querySelector('.Py_answer>span').innerText.match(/正确答案：\s*(\w+)/)[1].trim()
    let ans = e.querySelectorAll('ul>li>a')
    answer = answer.split('').map(e => ans[e.charCodeAt() - 'A'.charCodeAt()].innerText)
  }
  return {
    type,
    title: title.replace(/^【(.+)】/, ''),
    answer
  }
})

function whatttf() {
  var $tip = $('style:contains(font-cxsecret)');
  if (!$tip.length) return;
  var font = $tip.text().match(/base64,([\w\W]+?)'/)[1];
  font = Typr.parse(base64ToUint8Array(font))[0];
  var table = JSON.parse(GM_getResourceText('Table'));
  var match = {};
  for (var i = 19968; i < 40870; i++) { // 中文[19968, 40869]
    $tip = Typr.U.codeToGlyph(font, i);
    if (!$tip) continue;
    $tip = Typr.U.glyphToPath(font, $tip);
    $tip = $.md5(JSON.stringify($tip)).slice(24); // 8位即可区分
    match[i] = table[$tip];
  }

  // 替换加密字体
  $('.font-cxsecret').html(function (index, html) {
    $.each(match, function (key, value) {
      key = String.fromCharCode(key);
      key = new RegExp(key, 'g');
      value = String.fromCharCode(value);
      html = html.replace(key, value);
    });
    return html;
  }).removeClass('font-cxsecret'); // 移除字体加密

  function base64ToUint8Array(base64) {
    var data = window.atob(base64);
    var buffer = new Uint8Array(data.length);
    for (var i = 0; i < data.length; ++i) {
      buffer[i] = data.charCodeAt(i);
    }
    return buffer;
  }
}