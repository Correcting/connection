// Анализатор сообщений основной игры
module.exports = function(msg) {
  let st  = global.st
  st.act  = false // Поумолчанию ничего не делаем на входящее сообщение

  // Местности
  if ( msg.m.match('Чат лагеря')
    || msg.m.match('Ты вернулся в свой лагерь.')
  ) {
    st.act       = true
    st.cite      = 'лагерь'
  }

  if ( msg.m.match('уютный город Рино,')) {
    st.act       = true
    st.cite      = 'рино'
  }

  if ( msg.m.match('Твой путь преградил исполинских размеров монстр.')
    || msg.m.match('в этот раз ты не получил сдачи.')
  ) {
    st.act       = true
    st.cite      = 'гигант'
  }

  if ( msg.m.match('📯🚷 ❤️')
    || msg.m.match('📯❤️')
    || msg.m.match('📯🚷 Бэт-пещера')
  ) {
    st.act       = true
    st.cite      = 'данж'
  }

  if ( msg.m.match('Гигант повержен, путь дальше открыт!')
    || msg.m.match('Ты одержал победу!')
    || msg.m.match('Ты готов снова отправиться в Пустошь!')
  ) {
    st.cite      = 'пустошь'
    st.view      = false
  }

  if ( msg.m.match('Ты не сможешь увильнуть от противника')
    || msg.m.match('Тебе не уйти от противника')
    || msg.m.match('Во время вылазки на тебя напал')
  ) {
    st.cite      = 'пустошь'
    st.view      = false
    st.angyMob   = true
  }

  // Модификаторы местностей
  if ( msg.m.match('Ты оценил обстановку вокруг.')
    || msg.m.match('Ты огляделся вокруг себя.')
  ) st.view      = true

  if ( msg.m.match('в этот раз уже буквально.'))
    st.lowHealth = true

  if ( msg.m.match('Ты одержал победу!'))
    st.angyMob   = false

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
  if ( msg.m.match('Получено'))
    st.garbage   = true
}
