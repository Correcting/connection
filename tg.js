// Грузим либы
const MTProto   = require('@mtproto/core')
const TempStor  = require('@mtproto/core/src/storage/temp')
const { sleep } = require('@mtproto/core/src/utils/common')

// Класс обращения к сети TON и обработки ошибок
const API = class {
  constructor(id, hash) {
    this.mtproto = new MTProto({
      api_id: id, api_hash: hash,
      storageOptions: {instance: TempStor}
    })
    this.up      = this.mtproto.updates
  }

  // Чистый запрос к ТГ-апи
  async call(method, params, options = {}) {
    try {
      return await this.mtproto.call(method, params, options)
    } catch (error) {
      // Переспрашиваем сеть с задержкой при флуде с нашей стороны
      if (error.error_code === 420) {
        await sleep(1000 * Number(
          error.error_message.split('FLOOD_WAIT_')[1]
        ))
        return this.call(method, params, options)
      }

      // Меняем датацентр при необходимости
      if (error.error_code === 303) {
        const [type, dcIdAsString] = error.error_message.split('_MIGRATE_')
        const dcId = Number(dcIdAsString)

        if (type === 'PHONE') {
          await this.mtproto.setDefaultDc(dcId)
        } else {
          Object.assign(options, { dcId })
        }

        return this.call(method, params, options)
      }

      // На прочие ошибки рушимся
      console.log(`Исключение в ${method}:`, error)
      return Promise.reject(error)
    }
  }

  // Отправка сообщения
  send(name, text) {
    return this.call('messages.sendMessage', {
      message: text,
      peer:    {
        _:           'inputPeerUser',
        user_id:     global.sec.ids[name].id,
        access_hash: global.sec.ids[name].acc
      },
      random_id: Math.round(Math.random()*2000000000)
    })
  }

  // Пересылка сообщения
  fwd(fromName, msgId, toName) {
    return this.call('messages.forwardMessages', {
      from_peer: {
        _:           'inputPeerUser',
        user_id:     global.sec.ids[fromName].id,
        access_hash: global.sec.ids[fromName].acc
      },
      to_peer:   {
        _:           'inputPeerUser',
        user_id:     global.sec.ids[toName].id,
        access_hash: global.sec.ids[toName].acc
      },
      id:        [msgId],
      random_id: Math.round(Math.random()*2000000000)
    })
  }
}

module.exports = API
