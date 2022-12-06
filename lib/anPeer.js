// Анализатор сообщений основной игры
module.exports = function(msg) {
  let st      = global.st
  // Умолчания
  st.act      = false
  st.angryMob = false
  st.goodMob  = false

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

  if ( msg.m.match('📯🚷')
    || msg.m.match('📯❤️')
  ) {
    st.act       = true
    st.cite      = 'данж'
  }

  if ( msg.m.match('Твой путь преградил исполинских размеров монстр.')
    || msg.m.match('в этот раз ты не получил сдачи.')
  ) {
    st.act       = true
    st.cite      = 'гигант'
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
  if ( msg.m.match('Сделка завершена.')) {
    st.act       = true
    st.goodMob   = false
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

  // Ловим голод
  if (parse = msg.m.match(/🍗(\d+)%/))
    st.hangry = Number(parse[1])
  if (st.hangry > 5) {
      st.act    = true
  }

  // Ловим очистку
  if (!st.garbage)
    st.garbage   = foundShit(msg)
  if ( msg.m.match('/dl_')) // /cstock вызван
    if (st.garbage = grabShit(msg))
      st.act     = true
  if (parse = msg.m.match(/\/del_\d+/)) {
    st.act       = true
    st.garbage   = parse[0]
  }
}

// --------------------
// Ветка очистки
const badGoods = [
  'BFGzzv-4000',     'Боевая броня',   'Ржавый нож',
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

function foundShit(msg) {
  let parse = false
  for (let i=0; i<badGoods.length; i++) {
    parse = msg.m.match(new RegExp('Получено.*('+badGoods[i]+').*', 's'))
    if (parse) break
  }

  if (parse) {
    console.log(parse)
    if (parse[0].match('обломки')) return false
    else return parse[1]
  } else return false
}

function grabShit(msg) {
  let parse = false
  for (let i=0; i<badGoods.length; i++) {
    parse = msg.m.match(new RegExp(badGoods[i]+'.*(\\/dl_\\d+)'))
    if (parse) break
  }

  if (parse) return parse[1]
  else       return false
}
