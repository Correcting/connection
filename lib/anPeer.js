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
    || msg.m.match('Ты готов снова отправиться в Пустошь!')
    || msg.m.match('👁Осмотреться')
  ) {
    st.act       = true
    st.cite      = 'пустошь'
  }

  if ( msg.m.match('Во время вылазки на тебя напал')
    || msg.m.match('Ты не сможешь увильнуть от противника')
    || msg.m.match('Ты краем глаза заметил')
  ) {
    st.act       = true
    st.cite      = 'пустошь'
    st.angryMob  = true
  }

  // Модификаторы местностей
  if ( msg.m.match('в этот раз уже буквально.')) {
    st.act       = true
    st.lowHealth = true
  }

  if ( msg.m.match('Ты одержал победу!')) {
    st.act       = true
    st.angryMob  = false
  }

  if ( msg.m.match('Ты встретил бродячего торговца,')) {
    st.act       = true
    st.goodMob   = true
  }

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
  if ( msg.m.match('Получено')) {
    st.act       = true
    st.garbage   = 1
  }
  if ( msg.m.match('/dl_')) {
    if (grabShit(msg)) {
      st.act     = true
      st.garbage = 2
    } else st.garbage = false
  }
  if (parse = msg.m.match(/\/del_\d+/))
    st.garbage   = parse[0]
}
