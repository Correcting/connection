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

  // Ловим километраж (не вызывает непосредственного действия
  // (st.act остаётся false), требуется сюжетная реакция)
  let parse
  if (parse = msg.m.match(/🚷.*👣(\d+)км/s))
    st.x         = parse[1]
  if (parse = msg.m.match(/🚷.*(\d+)\s?км/))
    st.x         = parse[1]
  if (parse = msg.m.match(/👣(\d+)\s?км/))
    st.x         = parse[1]

  // Ловим очистку
  if ( msg.m.match('Получено'))
    st.garbage   = 'получено'
  if ( msg.m.match('/dl_')) {
    st.act       = true // Или мусор, или идти дальше
    st.garbage   = grabShit(msg)
  }
  if (parse = msg.m.match(/\/del_\d+/)) {
    st.act       = true
    st.garbage   = parse[0]
  }
}

function grabShit(msg) {
  const badGoods = [
    'BFGzzv-4000',     'Боевая броня',
    'Армагеддец',      'Потрошитель',
    'Боевая броня',    'Броня братства',
    'Кинжал',          'Кожанный нагрудник',
    'Кожаный жилет',   'Титановые щитки',
    'Гравипушка',      'Мачете',
    'Шипастая бита',   'Лазерный тесак',
    'Шляпа минитмена', 'Мото-защита',
    'Плотный капюшон', 'Противогаз',
    'Супермолот',      'Фалмерский клинок',
    'Фусронет',        'Копье',
    'Ушанка',          'Вязаная шапка',
    'Хлыст',           '🛠Мультизащита',
    'Кистень',         'Электромеч'
  ]

  let parse
  for (let i=0; i<badGoods.length; i++) {
    parse = msg.m.match(new RegExp(badGoods[i]+'.*(\\/dl_\\d+)'))
    if (parse) break
  }
  if (parse) return parse[1]
  else       return false
}
