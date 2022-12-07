// Анализатор сообщений основной игры
module.exports = function(msg) {
  let st       = global.st
  // Умолчания
  st.act       = false
  st.angryMob  = false
  st.goodMob   = false
  st.healthLow = false

//--------------------
// Анализируем
  // Местности
  if ( msg.m.match('Чат лагеря')
    || msg.m.match('Ты вернулся в свой лагерь.')
  ) {
    st.act        = true
    st.cite       = 'лагерь'
    st.health     = 1 // пришли на километр, можно снова лечиться
    st.healthAct  = 0 // пакет аптечек обновлён
  }

  if ( msg.m.match('уютный город Рино,')) {
    st.act        = true
    st.cite       = 'рино'
  }

  if ( msg.m.match('Гигант повержен, путь дальше открыт!')
    || msg.m.match('Ты готов снова отправиться в Пустошь!')
    || msg.m.match('👁Осмотреться')
  ) {
    st.act        = true
    st.cite       = 'пустошь'
    st.health     = 1 // пришли на километр, можно снова лечиться
  }

  if ( msg.m.match('Во время вылазки на тебя напал')
    || msg.m.match('Ты не сможешь увильнуть от противника')
    || msg.m.match('Ты краем глаза заметил')
  ) {
    st.act        = true
    st.cite       = 'пустошь'
    st.angryMob   = true
    st.health     = 1 // пришли на километр, можно снова лечиться
  }

  if ( msg.m.match('📯🚷')
    || msg.m.match('📯❤️')) {
    st.act        = true
    st.cite       = 'данж'
  }

  if ( msg.m.match('Твой путь преградил исполинских размеров монстр.')
    || msg.m.match('в этот раз ты не получил сдачи.')
  ) {
    st.act        = true
    st.cite       = 'гигант'
  }
  if ( msg.m.match('в этот раз уже буквально.')) {
    st.act        = true
    st.cite       = 'гигант'
    st.healthLow  = true
  }

  // Модификаторы местностей
  if ( msg.m.match('Ты встретил бродячего торговца,')) {
    st.act        = true
    st.goodMob    = true
  }
  if ( msg.m.match('Сделка завершена.')) {
    st.act        = true
    st.goodMob    = false
  }

  if ( msg.m.match('Ты одержал победу!')) {
    st.act        = true
    st.angryMob   = false
  }

  st.dark         = Boolean(msg.m.match('🚷'))

  // Ловим километраж
  let parse
  if (parse = msg.m.match(/🚷.*👣(\d+)км/s))
    st.x          = parse[1]
  if (parse = msg.m.match(/🚷.*(\d+)\s?км/))
    st.x          = parse[1]
  if (parse = msg.m.match(/👣(\d+)\s?км/))
    st.x          = parse[1]

  // Ловим лечение
  if (parse = msg.m.match(/❤️(\d+)\\/)) {
    st.healthLvl  = Number(parse[1])
  }
  if ( msg.m.match('/module_353')) // /mystock вызван
    st.health     = 2

  // Ловим голод
  if (parse = msg.m.match(/🍗(\d+)%/))
    st.hangryLvl  = Number(parse[1])
  if (parse = msg.m.match(/\/use_1[0-2]\d/)) { // /myfood вызван
    st.hangry     = 1 // hungry blyad
    st.hangryAct  = parse[0]
  }

  // Ловим очистку
  if (!st.garbage) foundShit(msg)
  if ( msg.m.match('/dl_')) // /cstock вызван
    grabShit(msg)
  if (parse = msg.m.match(/\/del_\d+/))
    st.garbageAct = parse[0]
}

// --------------------
// Ветка очистки
const badGoods = [
  'BFGzzv-4000',     'Боевая броня',       'Ржавый нож',
  'Армагеддец',      'Потрошитель',        'Электромеч',
  'Боевая броня',    'Броня братства',     'Кистень',
  'Кинжал',          'Кожанный нагрудник', '🛠Мультизащита',
  'Кожаный жилет',   'Титановые щитки',    'Хлыст',
  'Гравипушка',      'Мачете',             'Вязаная шапка',
  'Шипастая бита',   'Лазерный тесак',     'Ушанка',
  'Шляпа минитмена', 'Мото-защита',        'Копье',
  'Плотный капюшон', 'Противогаз',         'Фусронет',
  'Супермолот',      'Фалмерский клинок'
]

function foundShit(msg) {
  let parse = false
  for (let i=0; i<badGoods.length; i++) {
    parse = msg.m.match(new RegExp('Получено.*'+badGoods[i]+'.*', 's'))
    if (parse) break
  }

  if (parse) {
    console.log(parse)
    if (parse[0].match('обломки'))
      global.st.garbage    = 0
    else global.st.garbage = 1
  } else global.st.garbage = 0
}

function grabShit(msg) {
  let parse = false
  for (let i=0; i<badGoods.length; i++) {
    parse = msg.m.match(new RegExp(badGoods[i]+'.*(\\/dl_\\d+)'))
    if (parse) break
  }

  if (parse) {
    global.st.garbage      = 2
    global.st.garbageAct   = parse[1]
  } else global.st.garbage = 0
}
