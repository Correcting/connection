// Грузим либы и настройки
const TgApi  = require('./tg.js')
const prompt = require('prompt-sync')()
const Brain  = require('./brain2.js')
global       = require('./config.js')()

//------------------
// Асинхронная функция запуска
const start = async function() {
  // Подключаемся к ТГ
  let tg = global.tg = new TgApi(global.sec.apiId, global.sec.apiHash)

  // Запрос кода подтверждения от ТГ юзеру
  let tgAns = await tg.call('auth.sendCode', {
    phone_number: global.sec.phoneNo,
    settings:     {_: 'codeSettings'}
  })
  global.sec.phoneCodeHash = tgAns.phone_code_hash

  // Спрашиваем у юзера код
  global.sec.phoneCode = prompt('Какой код прислала ТГ? > ')

  // Логинимся
  tgAns = await tg.call('auth.signIn', {
    phone_number:    global.sec.phoneNo,
    phone_code:      global.sec.phoneCode,
    phone_code_hash: global.sec.phoneCodeHash
  })

  // Настраиваем слушателей
  tg.up.on('updateShortMessage', up => upShort(up))
  tg.up.on('updates',            up => upLong(up))
}
start() // Запустились

// Фоновая функция отсылки ответов
function pushOut() {
  let msg = global.out.shift()
  if (!msg) return // Исходящие пусты

  // Отсылаем
  if (msg.t == 's') global.tg.send(msg.n, msg.m)
  // Пересылаем
  if (msg.t == 'f') global.tg.fwd('peer', msg.id, 'pve')
}
// Отправка по таймеру
setInterval(pushOut, global.cfg.tgWait)
//------------------

//------------------
// Функция реакции на длинный update
function upLong(up) {
  // Откидываем не наши чаты
  let peerName
  let user = up.users.find(user => {
    for (peerName in global.sec.ids)
      if (global.sec.ids[peerName].id == user.id)
        return true
  })
  if (!user) return // Неинтересный собеседник
  global.sec.ids[peerName].acc = user.access_hash // Сохраняем хэш чата
  let update = up.updates.find(i => i._ == 'updateNewMessage')
  if (!update || update.message.out) return // Неинтересный вид сообщения

  // Передаём управление на "мозг"
  toBrain({
    t:  new Date(),
    id: user.id,
    n:  peerName,
    m:  update.message.message
  })
}

// Функция реакции на короткий update
function upShort(up) {
  // Откидываем не наши чаты
  let peerName
  let found = false
  for (peerName in global.sec.ids)
    if (global.sec.ids[peerName].id == up.user_id) {
      found = true
      break
    }
  if (!found) return // Неинтересный собеседник

  // Передаём управление на "мозг"
  toBrain({
    t:  new Date(),
    id: up.user_id,
    n:  peerName,
    m:  up.message
  })
}

// Функция логирования, проверки наличия access_hash,
// и переадресация на "мозг"
function toBrain(msg) {
  // Чистим логи
  while (global.log.length > global.cfg.logLen) global.log.shift()
  // Сохраняем только сообщения от основной игры
  if (msg.n == 'peer') global.log.push(msg)
  // Проверяем ключ чата
  if (global.sec.ids[msg.n].acc) brain(msg)
}
