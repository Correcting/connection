// Отправка
function send(name, msg) {
  return global.out.push({t: 's', n: name, m: msg})
}

// Контроллер действий в основной игре
module.exports = function(msg) {
  let st = global.st

  // Лагерь
  if ((st.cite == 'лагерь') && st.act) {
//    send('peer', '🛠Верстак')
//    send('peer', '⛑Аптечка')
    send('peer', '💉++ Суперстим')
    send('peer', '🏘В Нью-Рино')
    st.cite = 'марш'
    return
  }

  // Город Рино
  if ((st.cite == 'рино') && st.act) {
    send('peer', '/eat1')
    send('peer', '/eat1')
    send('peer', '/eat1')
    send('peer', '🧪Стимбласт+')
    send('peer', '🧪Стимбласт')
    send('peer', '💌 Медпак')
    send('peer', '🧪Стимбласт')
    send('peer', '💊 Баффаут')
    send('peer', '💌 Медпак')
    send('peer', '💉 Мед-Х')
    send('peer', '💊 Баффаут')
    send('peer', '💌 Медпак')
    send('peer', '💉 Мед-Х')
    send('peer', '👣Пустошь')
    st.cite = 'марш'
    return
  }

  // Битва с гигантом (работаем без st.act)
  if (st.cite == 'гигант') {
    if (!st.healthLow)
      send('peer', '⚔️Атаковать')
    else {
      send('peer', '⛺️Вернуться')
      send('peer', 'Вернуться в лагерь')
      st.cite      = 'марш'
      st.healthLow = false
    }
    return
  }

  // Данж
  if ((st.cite == 'данж') && st.act) {
    send('peer', 'Двигаться дальше')
    return
  }

  // Пустошь
  if ((st.cite == 'пустошь') && st.act) {
    // Воюем злого моба
    if (st.angryMob) {
      send('peer', '⚔️Дать отпор')
      return
    }

    // Торгуем доброго моба
    if (st.goodMob) {
      send('peer', '/buy_5i')
      return
    }
    
    if (st.goodMob2) {
      send('peer', '/buy_trash')
      return
    }

    // Идём куда надо
    st.cite = 'марш'
    if (!actPath())
      send('peer', '👣Идти дaльше')
    return
  } // пустошь

  // На марше (работаем без st.act)
  if (st.cite == 'марш') {
    // Здоровье
    if (st.healthLvl && (st.healthLvl < st.healthMin)) {
      // Прожимаем /mystock
      if (st.health == 1) {
        send('peer', '/mystock')
        return
      }
      // Лечимся
      if (st.health == 2) {
        getDrugs()
        return
      }
    }

    // Еда
    if (st.hangryLvl > st.hangryMax) {
      // Прожимаем /myfood
      if (st.hangry == 0) {
        send('peer', '/myfood')
        return
      }
      // Кушаем
      if (st.hangry == 1) {
        send('peer', st.hangryAct)
        st.hangry    = 0
        st.hangryLvl = 0
        return
      }
    }

    // Мусор:
    // Прожимаем /cstock
    if (st.garbage == 1) {
      send('peer', '/cstock')
      return
    }
    // Допрожимаем /\/dl_\d/ или /\/del_\d/
    if (st.garbage == 2) {
      send('peer', st.garbageAct)
      return
    }
  } // марш
} // actPeer()

// --------------------
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
      case 50:
        send('peer', '🛑Руины Гексагона')
        send('peer', 'Двигаться дальше')
        return true
//      case 51:
//        send('peer', '🛏Безопасный привал')
//        send('peer', '/deeprest')
//        return true
      case 52:
        send('peer', '🚷В Темную зону')
        return true
      case 77:
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
} // actPath()

// --------------------
// Употребление наркотегов
function getDrugs() {
  let st = global.st
  switch (st.healthAct) {
    case 0:  send('peer', '/buffout');     break
    case 1:  send('peer', '/buffout');     break
    case 2:  send('peer', '/medx1');       break
    case 3:  send('peer', '/medx1');       break
    case 4:  send('peer', '/stimblast');   break
    case 5:  st.health = 0; /* ждём */     break
    case 6:  send('peer', '/medpack');     break
    case 7:  send('peer', '/medpack');     break
    case 8:  send('peer', '/medpack');     break
    case 9:  send('peer', '/stimblast');   break
    case 10: st.health = 0; /* ждём */     break
    case 11: send('peer', '/stimblast_s'); break
  }
  st.healthAct++ // готовим следующую таблетку
} // getDrugs()
