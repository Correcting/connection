// Анализатор сообщений основной игры
module.exports = function(msg) {
  let st  = global.st
  let mat = msg.m.match

  // Местности
  if ( mat('Чат лагеря')
    || mat('Ты вернулся в свой лагерь.')
  ) st.cite      = 'лагерь'

  if ( mat('уютный город Рино,'))
    st.cite      = 'рино'

  if ( mat('Твой путь преградил исполинских размеров монстр.')
    || mat('в этот раз ты не получил сдачи.')
  ) st.cite      = 'гигант'

  if ( mat('📯🚷 ❤️')
    || mat('📯❤️')
    || mat('📯🚷 Бэт-пещера')
  ) st.cite      = 'данж'

  if ( mat('Гигант повержен, путь дальше открыт!')
    || mat('Ты одержал победу!')
    || mat('Ты готов снова отправиться в Пустошь!')
    || mat('👣')
  ) {
    st.cite      = 'пустошь'
    st.view      = false
  }

  if ( mat('Ты не сможешь увильнуть от противника')
    || mat('Тебе не уйти от противника')
    || mat('Во время вылазки на тебя напал')
  ) {
    st.cite      = 'пустошь'
    st.view      = false
    st.angyMob   = true
  }

  // Модификаторы местностей
  if ( mat('Ты оценил обстановку вокруг.')
    || mat('Ты огляделся вокруг себя.')
  ) st.view      = true

  if ( mat('в этот раз уже буквально.'))
    st.lowHealth = true

  if (
       msg.m.match('Ты одержал победу!')
    || msg.m.match('Ты готов снова отправиться в Пустошь!')
  ) st.angyMob   = false

  if ( msg.m.match('Ты встретил бродячего торговца,'))
    st.goodMob   = true

  st.dark        = Boolean(msg.m.match('🚷'))

  // Ловим километраж
  let parse
  if (parse = msg.m.match(/🚷.*👣(\d+)км/s))
    st.x         = parse[1]
  if (parse = msg.m.match(/🚷.*(\d+)\s?км/))
    st.x         = parse[1]
  if (parse = msg.m.match(/👣(\d+)\s?км/))
    st.x         = parse[1]

  // Ловим очистку
  if (msg.m.match('Получено'))
    st.garbage   = true
}
