// Анализатор сообщений основной игры
module.exports = function(msg) {
  let st = global.st

  // Местности
  if (
       msg.m.match('Чат лагеря')
    || msg.m.match('Ты вернулся в свой лагерь.')
  ) st.cite      = 'лагерь'

  if ( msg.m.match('уютный город Рино,'))
    st.cite      = 'рино'

  if (
       msg.m.match('Твой путь преградил исполинских размеров монстр.')
    || msg.m.match('в этот раз ты не получил сдачи.')
  ) st.cite      = 'гигант'

  if (
       msg.m.match('📯🚷 ❤️')
    || msg.m.match('📯❤️')
    || msg.m.match('📯🚷 Бэт-пещера')
  ) st.cite      = 'данж'

  if (
       msg.m.match('Гигант повержен, путь дальше открыт!')
    || msg.m.match('Ты одержал победу!')
    || msg.m.match('Ты готов снова отправиться в Пустошь!')
    || msg.m.match('👣')
  ) {
    st.cite      = 'пустошь'
    st.view      = false
  }

  if (
    msg.m.match('Ты не сможешь увильнуть от противника')
    || msg.m.match('Тебе не уйти от противника')
    || msg.m.match('Во время вылазки на тебя напал')
  ) {
    global.st.cite      = 'пустошь'
    global.st.view      = false
    global.st.angyMob   = true
  }

  // Модификаторы местностей
  if (
    msg.m.match('Ты оценил обстановку вокруг.')
    || msg.m.match('Ты огляделся вокруг себя.')
  ) global.st.view      = true

  if (msg.m.match('в этот раз уже буквально.'))
    global.st.lowHealth = true

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
