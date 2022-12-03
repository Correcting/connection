// Анализатор сообщений основной игры
module.exports = function(msg) {
  // Местности
  if (
    msg.m.match('Чат лагеря')
    || msg.m.match('Ты вернулся в свой лагерь.')
  )
    global.st.cite      = 'лагерь'
  if (msg.m.match('уютный город Рино,'))
    global.st.cite      = 'рино'
  if (
    msg.m.match('Твой путь преградил исполинских размеров монстр.')
    || msg.m.match('в этот раз ты не получил сдачи.')
  ) global.st.cite      = 'гигант'
  if (
    msg.m.match('Гигант повержен, путь дальше открыт!')
    || msg.m.match('Ты одержал победу!')
    || msg.m.match('Ты готов снова отправиться в Пустошь!')
  ) {
    global.st.cite      = 'пустошь'
    global.st.view      = false // Осмотр после боя и отдыха не проведен, возможен забытый лут
  }
  if (
    msg.m.match('Ты оценил обстановку вокруг.')
    || msg.m.match('Ты огляделся вокруг себя.')
  ) global.st.view      = true
  if (
    msg.m.match('📯🚷 ❤️')
    || msg.m.match('📯❤️')
    || msg.m.match('📯🚷 Бэт-пещера')
  ) global.st.cite      = 'данж'

  // Модификаторы местностей
  if (msg.m.match('в этот раз уже буквально.'))
    global.st.lowHealth = true
  if (
    msg.m.match('Ты не сможешь увильнуть от противника')
    || msg.m.match('Тебе не уйти от противника')
    || msg.m.match('Во время вылазки на тебя напал')
  ) global.st.angyMob   = true
  if (
    msg.m.match('Ты одержал победу!')
    || msg.m.match('Ты готов снова отправиться в Пустошь!')
  ) global.st.angyMob   = false
  if (msg.m.match('Ты встретил бродячего торговца,'))
    global.st.goodMob   = true
  global.st.dark        = Boolean(msg.m.match('🚷'))

  // Ловим километраж
  let parse
  if (parse = msg.m.match(/🚷.*👣(\d+)км/s))
    global.st.x         = parse[1]
  if (parse = msg.m.match(/🚷.*(\d+)\s?км/))
    global.st.x         = parse[1]
  if (parse = msg.m.match(/👣(\d+)\s?км/))
    global.st.x         = parse[1]

  // Ловим очистку
  if (msg.m.match('Получено'))
    global.st.garbage   = true
}
