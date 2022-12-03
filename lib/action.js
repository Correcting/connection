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

  if (global.st.cite == 'рино') {
    send('peer', '/eat1')
    send('peer', '/eat1')
    send('peer', '/eat1')
    send('peer', '👣Пустошь')
    return
  }

  if (global.st.cite == 'гигант') {
    if (!global.st.lowHealth)
      send('peer', '⚔️Атаковать')
    else {
      send('peer', '⛺️Вернуться')
      send('peer', 'Вернуться в лагерь')
    }
    return
  }
}
