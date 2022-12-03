// Техническая функция: интуиция говорит: "Оставить!" - хрен знает почему
const brain = function(msg) {
  console.log('--------------------')
  console.log(msg)
/*
msg - это объект вида: {
    t:  new Date() на момент получения обновления от ТГ,
    id: ТГ id юзера,
    n:  наше имя юзера из списка sec.ids,
    m:  текст сообщения
  }
*/
  if (msg.n == 'peer') main(msg) // Обрабатываем собеседника "peer"
//  if (msg.n == 'info') raid(msg) // Обрабатываем "info"
}
module.exports = brain // Единственный наш интерфейс во внешний мир

// Дерево состояний
global.st = {
  cite:      null,
  dark:      false,
  x:         null,
  angyMob:   false,
  lowHealth: false
}

// --------------------
// Анализатор сообщений основной игры
function main(msg) {
  // Местности
  if (msg.m.match('Чат лагеря'))
    global.st.cite      = 'лагерь'
  if (msg.m.match('уютный город Рино,'))
    global.st.cite      = 'рино'
  if (msg.m.match('в этот раз уже буквально.'))
    global.st.lowHealth = true
  if (
    msg.m.match('Твой путь преградил исполинских размеров монстр.')
    || msg.m.match('в этот раз ты не получил сдачи.')
  ) global.st.cite      = 'гигант'
  if (
    msg.m.match('📯🚷 ❤️')
    || msg.m.match('📯❤️')
  ) global.st.cite      = 'данж'
  if (msg.m.match('📯🚷 Бэт-пещера'))
    global.st.cite      = 'данж'

  // Модификаторы местностей
  if (
    msg.m.match('Ты не сможешь увильнуть от противника')
    || msg.m.match('Тебе не уйти от противника')
    || msg.m.match('Во время вылазки на тебя напал')
  ) global.st.angyMob   = true
  global.st.dark        = Boolean(msg.m.match('🚷'))

  // Ловим километраж
  let parse
  if (parse = msg.m.match(/🚷.*👣(\d+)км/s))
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
  if (msg.m.match('Получено')) {
//    foundShit(msg)
    console.log('ok')
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


