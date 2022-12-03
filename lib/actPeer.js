// Отправка
function send(name, msg) {
  return global.out.push({t: 's', n: name, m: msg})
}

// Контроллер действий в основной игре
module.exports = function(msg) {
  // Лагерь
  if (global.st.cite == 'лагерь') {
    send('peer', '🏘В Нью-Рино')
    global.st.cite = 'марш'
    return
  }

  // Город Рино
  if (global.st.cite == 'рино') {
    send('peer', '/eat1')
    send('peer', '/eat1')
    send('peer', '/eat1')
    send('peer', '👣Пустошь')
    global.st.cite = 'марш'
    return
  }

  // Битва с гигантом
  if (global.st.cite == 'гигант') {
    if (!global.st.lowHealth)
      send('peer', '⚔️Атаковать')
    else {
      send('peer', '⛺️Вернуться')
      send('peer', 'Вернуться в лагерь')
      global.st.cite = 'марш'
    }
    return
  }

  // Пустошь
  if (global.st.cite == 'пустошь') {
    if (global.st.angryMob) {
      send('peer', '⚔️Дать отпор')
      return
    }
    if (!global.st.view) {
      send('peer', '/view')
      return
    }
    if (!actPath())
      send('peer', '👣Идти дaльше')
    global.st.cite = 'марш'
    global.st.view = false // Сменяется километр, осмотр более невалидный
    return
  }
}

// Реакция на километраж
function actPath() {
  if (!global.st.dark) {
    switch (global.st.x) {
      case 11:
        send('peer', 'Старая шахта')
        send('peer', 'Двигаться дальше')
        return true
//      case 12: //case's options : 9,12, 20, 46, 54
//        send('peer', '/voevat_suda')
//        return true
      case 22:
        send('peer', '🚷В Темную зону')
        return true
      case 45:
        send('peer', '🌁Высокий Хротгар')
        send('peer', 'Двигаться дальше')
        return true
//      case 50:
//        send('peer', '🛑Руины Гексагона')
//        send('peer', 'Двигаться дальше')
//        return true
      case 51:
        send('peer', '🛏Безопасный привал')
        send('peer', '/deeprest')
        return true
      case 52:
        send('peer', '🚷В Темную зону')
        return true
      case 73:
        send('peer', '⛺️Вернуться')
        send('peer', 'Вернуться в лагерь')
        return true
      default: return false // Указанный километраж не найден
    }
  } else { // Если темно
    switch (global.st.x) {
      case 23:
        send('peer', '🚽Сточная труба')
        send('peer', 'Двигаться дальше')
        return true
      case 34:
        send('peer', '🦇Бэт-пещера')
        send('peer', 'Двигаться дальше')
        return true
      case 56:
        send('peer', '🔬Научный комплекс')
        send('peer', 'Двигаться дальше')
        return true
//      case 63: //case's options : 24, 32, 38, 63
//        send('peer', '/voevat_suda')
//        return true
      default: return false // Указанный километраж не найден
    }
  }
}
