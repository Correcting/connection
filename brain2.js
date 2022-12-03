// Грузим либы
const analyse = require('./lib/analyse.js')
const action  = require('./lib/action.js')

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

module.exports = function(msg) {
  console.log('--------------------')
  console.log(global.st)
  console.log(msg)
/*
msg - это объект вида: {
    t:  new Date() на момент получения обновления от ТГ,
    id: ТГ id юзера,
    n:  наше имя юзера из списка sec.ids,
    m:  текст сообщения
  }
*/
  // Обрабатываем собеседника "peer"
  if (msg.n == 'peer') {
    analyse(msg)
    action(msg)
  }
//  if (msg.n == 'info') raid(msg) // Обрабатываем собеседника "info"
}
