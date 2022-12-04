// Грузим либы
const anPeer  = require('./lib/anPeer.js')
const actPeer = require('./lib/actPeer.js')
//const anInfo  = require('./lib/anInfo.js')
//const actInfo = require('./lib/actInfo.js')
//const anPve   = require('./lib/anPve.js')
//const actPve  = require('./lib/actPve.js')

/*
msg - это объект вида: {
  t:  new Date() на момент получения обновления от ТГ,
  id: ТГ id юзера,
  n:  наше имя юзера из списка sec.ids,
  m:  текст сообщения
}
*/
module.exports = class {
  constructor() {
    // Дерево состояний (как мы видим мир)
    global.st = {
      need:      false, // нужно ли действие?
      cite:      null,  // где мы по типу местности?
      view:      false, // осмотрелись ли?
      dark:      false, // темная ли зона?
      x:         null,  // какой сейчас километр?
      angyMob:   false, // есть ли рядом злой моб?
      goodMob:   false, // есть ли рядом добрый моб?
      lowHealth: false, // игра дала понять, что мало здоровья?
      garbage:   false  // что по хламу в рюкзаке?
    }
  }

  run(msg) {
    console.log('----------------------------------------')
    console.log('Сообщение:', msg)

    // Обрабатываем собеседника "peer"
    if (msg.n == 'peer') {
      anPeer(msg)
      console.log('Статусы:', global.st)
      actPeer(msg)
      console.log('Исходящие:', global.out)
    }
  /*
    // Обрабатываем собеседника "info"
    if (msg.n == 'info') {
      anInfo(msg)
      actInfo(msg)
    }

    // Обрабатываем собеседника "pve"
    if (msg.n == 'pve') {
      anInfo(msg)
      actInfo(msg)
    }
  */
  }
}
