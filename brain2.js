// Грузим либы
const anPeer  = require('./lib/anPeer.js')
const actPeer = require('./lib/actPeer.js')
//const anInfo  = require('./lib/anInfo.js')
//const actInfo = require('./lib/actInfo.js')
//const anPve   = require('./lib/anPve.js')
//const actPve  = require('./lib/actPve.js')

module.exports = class {
  constructor() {
    // Дерево состояний (как мы видим мир)
    global.st = {
      pause:      false, // приказал ли Хозяин стоять?
      act:        null,  // нужно ли действие?
      cite:       null,  // где мы по типу местности?
      dark:       null,  // темная ли зона?
      x:          null,  // какой сейчас километр?
      angryMob:   null,  // есть ли рядом злой моб?
      goodMob:    null,  // есть ли рядом добрый моб?
      health:     1,     // какая из операций лечения?
      healthLvl:  null,  // какой сейчас уровень здоровья?
      healthMin:  800,   // минимально допустимый уровень здоровья?
      healthLow:  null,  // игра дала понять, что мало здоровья?
      healthAct:  0,     // чем лечиццо будем?
      hangry:     0,     // какая из операций голода?
      hangryLvl:  null,  // какой сейчас уровень голода?
      hangryMax:  70,    // максимально допустимый уровень голода?
      hangryAct:  '',    // что кушоц будем?
      garbage:    0,     // какая из операций очистки хлама?
      garbageAct: ''     // что прожимать для удаления?
    }
  }

/*
msg - это объект вида: {
  t:  new Date() на момент получения обновления от ТГ,
  id: ТГ id юзера,
  n:  наше имя юзера из списка sec.ids,
  m:  текст сообщения
}
*/
  run(msg) {
    console.log('----------------------------------------')
    console.log('Сообщение:', msg)

    // Обрабатываем собеседника "peer"
    if (msg.n == 'peer') {
      anPeer(msg)
      console.log('Статусы:', global.st)
      if (!st.pause) actPeer(msg)
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
