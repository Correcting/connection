// Отправка
function send(name, msg) {
  return global.out.push({t: 's', n: name, m: msg})
}

// Контроллер действий в основной игре
module.exports = function(msg) {
  if (global.st.cite == 'лагерь') {
    send('peer', '🏘В Нью-Рино')
    return
  }
}
