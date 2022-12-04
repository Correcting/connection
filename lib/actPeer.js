// Отправка
function send(name, msg) {
  return global.out.push({t: 's', n: name, m: msg})
}

// Контроллер действий в основной игре
module.exports = function(msg) {
  let st = global.st

  // Лагерь
  if (st.cite == 'лагерь') {
    send('peer', '🏘В Нью-Рино')
    st.cite = 'пустошь'
    return
  }

  // Город Рино
  if (st.cite == 'рино') {
    send('peer', '/eat1')
    send('peer', '/eat1')
    send('peer', '/eat1')
    send('peer', '👣Пустошь')
    st.cite = 'пустошь'
    return
  }

  // Битва с гигантом
  if (st.cite == 'гигант') {
    if (!st.lowHealth)
      send('peer', '⚔️Атаковать')
    else {
      send('peer', '⛺️Вернуться')
      send('peer', 'Вернуться в лагерь')
      st.cite = 'пустошь'
    }
    return
  }

  // Данж
  if (st.cite == 'данж') {
    send('peer', 'Двигаться дальше')
    return
  }

  // Пустошь
  if (st.cite == 'пустошь') {
    // Воюем злого моба
    if (st.angryMob) {
      send('peer', '⚔️Дать отпор')
      return
    }

    // Торгуем доброго моба
    if (st.goodMob) {
//      send('peer', '⚔️Дать отпор')
      return
    }

    // Выбрасываем мусор
    if (st.garbage) {
      if (st.garbage == 1) {
        send('peer', '/cstock')
        
        return
      }
      if (st.garbage == 2) {
        
        return
      }
    }

    // Идём куда надо
    if (!actPath()) {
      send('peer', '👣Идти дaльше')
      return
    }
  }
}

// Реакция на километраж
function actPath() {
  let st = global.st
  let x  = Number(st.x)

  if (!st.dark) {
    switch (x) {
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
    switch (x) {
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
