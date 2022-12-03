// Грузим либы
const analyse = require('./lib/analyse.js')
const action  = require('./lib/action.js')

// Техническая функция: интуиция говорит: "Оставить!" - хрен знает почему
const brain = function(msg) {
  console.log('--------------------')
  console.log(msg)
/*
msg - это объект вида: {
    t:  new Date() на момент получения обновления от ТГ,
    id: ТГ id юзера,
    n:  наше имя юзера из списка sec.ids,
    m:  текст сообщения
  }
*/
  if (msg.n == 'peer') main(msg) // Обрабатываем собеседника "peer"
//  if (msg.n == 'info') raid(msg) // Обрабатываем "info"
}
module.exports = brain // Единственный наш интерфейс во внешний мир

// Дерево состояний
global.st = {
  cite:      null,
  dark:      false,
  x:         null,
  angyMob:   false,
  goodMob:   false,
  lowHealth: false,
  garbage:   false
}

// --------------------



