// Техническая функция: интуиция говорит: "Оставить!" - хрен знает почему
const brain = function(msg) {
/*
msg - это объект вида: {
    t:  new Date() на момент получения обновления от ТГ,
    id: ТГ id юзера,
    n:  наше имя юзера из списка sec.ids,
    m:  текст сообщения
  }
*/
  if (msg.n == 'peer') main(msg) // Обрабатываем собеседника "peer"
  if (msg.n == 'info') raid(msg) // Обрабатываем "info"
  console.log(msg)
  console.log('--------------------')
}
module.exports = brain // Единственный наш интерфейс во внешний мир

// Отправка
function send(name, msg) {
  return global.out.push({t: 's', n: name, m: msg})
}

// Пересылка
function fwd(msgId) {
  return global.out.push({t: 'f', id: msgId})
}

// --------------------
// Главный роутер основной игры
function main(msg) {
  if (msg.m.match('Чат лагеря')) {
    send('peer', '🏘В Нью-Рино')
    return
  }

  if (msg.m.match('уютный город Рино,')) {
    send('peer', '/eat1')
    send('peer', '/eat1')
    send('peer', '/eat1')
    send('peer', '/eq_480')
    send('peer', '/eq_472')
    send('peer', '/eq_43')
    send('peer', '👣Пустошь')
    return
  }

  if (msg.m.match('в этот раз уже буквально.')) {
    send('peer', '⛺️Вернуться')
    send('peer', 'Вернуться в лагерь')
    return
  }

  if (
    msg.m.match('Твой путь преградил исполинских размеров монстр.')
    || msg.m.match('в этот раз ты не получил сдачи.')
  ) {
    send('peer', '⚔️Атаковать')
    return
  }

  if (
    msg.m.match('📯🚷 ❤️')
    || msg.m.match('📯❤️')
  ) {
    send('peer', 'Двигаться дальше')
    return
  }

  if (msg.m.match('📯🚷 Бэт-пещера')) {
    send('peer', '/eq_480')
    send('peer', 'Двигаться дальше')
    return
  }

  if (
    msg.m.match('Ты не сможешь увильнуть от противника')
    || msg.m.match('Тебе не уйти от противника')
    || msg.m.match('Во время вылазки на тебя напал')
  ) {
    send('peer', '⚔️Дать отпор')
    return
  }

  // Ловим километраж
  let parse
  if (parse = msg.m.match(/🚷[\s\S]*👣(\d+)км/))
    if (actPath(parse[1], false)) return
  if (parse = msg.m.match(/🚷.*(\d+)\s?км/))
    if (actPath(parse[1], false)) return
  if (parse = msg.m.match(/👣(\d+)\s?км/))
    if(actPath(parse[1])) return

  if (msg.m.match('Ты встретил бродячего торговца,')) {
    send('peer', '/buy_5i')
    send('peer', '/view')
    return
  }

  if (
    msg.m.match('Ты оценил обстановку вокруг.')
    || msg.m.match('Ты огляделся вокруг себя.')
    || msg.m.match('Рейд в 01:00')
    || msg.m.match('Рейд в 9:00')
    || msg.m.match('Рейд в 17:00')
  ) {
    send('peer', '👣Идти дaльше')
    return
  }

  if (
    msg.m.match('/view')
    || msg.m.match('Ты одержал победу!')
    || msg.m.match('Ты готов снова отправиться в Пустошь!')
  ) {
    send('peer', '/view')
    return
  }

  if (msg.m.match('Ты очень голоден.')) {
    send('peer', '/myfood')
    return
  }
  
  if (parse = msg.m.match(/\/use_1[0-2]\d/g)) {
    send('peer', parse[0])
    return
  }

  // Ловим очистку
  if (msg.m.match(/(Получено:)|(Найдено:)/)) {
    foundShit(msg)
    return
  }
     
  if (msg.m.match('/dl_')) {
    grabShit(msg)
    return
  }
  
  if (parse = msg.m.match(/\/del_\d+/)) {
    send('peer', parse[0])
    return
  }
}

// Роутер рейдовой залупы
function raid(msg) {
  if (msg.m.match(/⛺️\sЛагеря.*📍\s(\d+)км:/)) {
    send('peer', ' _ ')
    return
  }
  
  if (parse = msg.m.match(/\/del_\d+/)) {
    send('peer', parse[0])
    return
  }
}

// --------------------
// Ветка километража
function actPath(parse, light=true) {
  let x = Number(parse)

  if (light) {
    switch (x) {
      case 2:
        send('peer', '👣Идти дaльше')
        return true
      case 11:
        send('peer', 'Старая шахта')
        send('peer', 'Двигаться дальше')
        return true
//      case 22:
//        send('peer', '🚷В Темную зону')
//        return true
      case 27:
        send('peer', '👣Идти дaльше')
        return true
      case 40:
        send('peer', '/eq_54')
        send('peer', '/eq_73')
        send('peer', '👣Идти дaльше')
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
//      case 52:
//        send('peer', '🚷В Темную зону')
//        return true
      case 68: case 69:
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
        send('peer', '/eq_53')
        return true
      case 56:
        send('peer', '🔬Научный комплекс')
        send('peer', 'Двигаться дальше')
        return true
//      case 63:
//        send('peer', '/voevat_suda')
//        send('peer', '/stealth')
//        return true
      default: return false // Указанный километраж не найден
    }
  }
}

// --------------------
// Ветка очистки
const badGoods = [
  'BFGzzv-4000',
  'Боевая броня',
  'Армагеддец',
  'Потрошитель',
  'Боевая броня',
  'Броня братства',
  'Кинжал',
  'Кожанный нагрудник',
  'Кожаный жилет',
  'Титановые щитки',
  'Гравипушка',
  'Мачете',
  'Шипастая бита',
  'Лазерный тесак',
  'Шляпа минитмена',
  'Мото-защита',
  'Плотный капюшон',
  'Противогаз',
  'Супермолот',
  'Фалмерский клинок',
  'Фусронет',
  'Копье',
  'Ушанка',
  'Вязаная шапка',
  'Хлыст',
  'Кистень',
  'Электромеч'
]

function foundShit(msg) {
  let parse
  for (let i=0; i<badGoods.length; i++) {
    parse = msg.m.match(new RegExp('(Получено:)|(Найдено:).*'+badGoods[i], 's'))
    if (parse) break
  }
  if (parse) send('peer', '/cstock')
}

function grabShit(msg) {
  let parse
  for (let i=0; i<badGoods.length; i++) {
    parse = msg.m.match(new RegExp(badGoods[i]+'.*(\\/dl_\\d+)'))
    if (parse) break
  }
  if (parse) send('peer', parse[1])
}
