// Техническая функция: интуиция говорит: "Оставить!" - хрен знает почему
const brain = function(msg) {
/*  msg - это объект вида: {
    t:  new Date(),
    id: up.user_id,
    n:  peerName,
    m:  up.message
  }*/
  main(msg)
  console.log(msg)
  console.log('--------------------')
}
module.exports = brain // Единственный наш интерфейс во внешний мир

// Главный роутер
function main(msg) {
  let out = global.out // Наши исходящие

  if (msg.match('Чат лагеря')) {
    out.push('🏘В Нью-Рино')
    return
  }

  if (msg.match('уютный город Рино,')) {
    out.push(
      '/eat1', '/eat2', '/eat2',
      '/eq_480', '/eq_472', '/eq_43',
      '👣Пустошь'
    )
    return
  }

  if (msg.match('в этот раз уже буквально.')) {
    out.push('⛺️Вернуться', 'Вернуться в лагерь')
    return
  }

  if (
    msg.match('Твой путь преградил исполинских размеров монстр.')
    || msg.match('в этот раз ты не получил сдачи.')
  ) {
    out.push('⚔️Атаковать')
    return
  }

  if (
    msg.match('📯🚷 ❤️')
    || msg.match('📯❤️')
  ) {
    out.push('Двигаться дальше')
    return
  }

  if (msg.match('📯🚷 Бэт-пещера')) {
    out.push('/eq_480', 'Двигаться дальше')
    return
  }

  if (
    msg.match('Ты не сможешь увильнуть от противника')
    || msg.match('Тебе не уйти от противника')
    || msg.match('Во время вылазки на тебя напал')
  ) {
    out.push('⚔️Дать отпор')
    return
  }

  // Ловим километраж
  let parse
  if (parse = msg.match(/🚷[\s\S]*👣(\d+)км/))
    if (actPath(parse[1], false)) return
  if (parse = msg.match(/🚷.*(\d+)\s?км/))
    if (actPath(parse[1], false)) return
  if (parse = msg.match(/👣(\d+)\s?км/))
    if(actPath(parse[1])) return

  if (msg.match('Ты встретил бродячего торговца,')) {
    out.push('/buy_5i', '/view')
    return
  }

  if (
    msg.match('Ты оценил обстановку вокруг.')
    || msg.match('Ты огляделся вокруг себя.')
    || msg.match('Рейд в 01:00')
    || msg.match('Рейд в 9:00')
    || msg.match('Рейд в 17:00')
  ) {
    out.push('👣Идти дaльше')
    return
  }

  if (
    msg.match('/view')
    || msg.match('Ты одержал победу!')
    || msg.match('Ты готов снова отправиться в Пустошь!')
    || msg.match(' и его')
    || msg.match('с виду зверька. Это был кот,')
    || msg.match('— Кис-кис-кис..')
    || msg.match('\n🐐')
    || msg.match('\s🤘')
    || msg.match('(без банды)')
    || msg.match('водохранилище\n 🕳+')
    || msg.match('датацентр\n 🕳+')
  ) {
    out.push('/view')
    return
  }

  if (msg.match('Ты очень голоден.')) {
    out.push('/myfood')
    return
  }
  if (parse = msg.match(/\/use_1[0-2]\d/g)) {
    out.push(parse[0])
    return
  }

  // Ловим очистку
  if (msg.match('/dl_')) {
    actClean(msg)
    return
  }
  if (parse = msg.match(/\/del_\d+/)) {
    out.push(parse[0])
    return
  }
}

// --------------------
// Ветка километража
function actPath(parse, light=true) {
  let out = global.out // Наши исходящие
  let x = Number(parse)

  if (light) {
    switch (x) {
      case 2:
        out.push('👣Идти дaльше')
        return true
      case 11:
        out.push('Старая шахта', 'Двигаться дальше')
        return true
//      case 22:
//        out.push('🚷В Темную зону')
//        return true
      case 27:
        out.push('👣Идти дaльше')
        return true
      case 40:
        out.push('/eq_54', '/eq_73', '👣Идти дaльше')
        return true
      case 45:
        out.push('🌁Высокий Хротгар', 'Двигаться дальше')
        return true
//      case 50:
//        out.push('🛑Руины Гексагона', 'Двигаться дальше')
//        return true
      case 51:
        out.push('🛏Безопасный привал', '/deeprest')
        return true
//      case 52:
//        out.push('🚷В Темную зону')
//        return true
      case 68: case 69:
        out.push('⛺️Вернуться', 'Вернуться в лагерь')
        return true
      default: return false // Указанный километраж не найден
    }
  } else { // Если темно
    switch (x) {
      case 23:
        out.push('🚽Сточная труба', 'Двигаться дальше')
        return true
      case 34:
        out.push('🦇Бэт-пещера', 'Двигаться дальше', '/eq_53')
        return true
      case 56:
        out.push('🔬Научный комплекс', 'Двигаться дальше')
        return true
//      case 63:
//        out.push('/voevat_suda', '/stealth')
//        return true
      default: return false // Указанный километраж не найден
    }
  }
}

// --------------------
// Ветка очистки
function actClean(msg) {
  let out = global.out // Наши исходящие
  const badGoods = [
   'BFGzzv-4000',
    'Боевая броня',
    'Армагеддец',
    'Потрошитель',
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

  let parse
  for (let i=0; i<badGoods.length; i++) {
    parse = msg.match(new RegExp(badGoods[i]+'.*(\\/dl_\\d+)'))
    if (parse) break
  }
  if (parse) out.push(parse[1])
}

