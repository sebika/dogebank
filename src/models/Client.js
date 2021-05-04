import Field from './Field'
import Model from './Model'

export default class Client {
  static _fields = {
    nume:               Field.String(),
    prenume:            Field.String(),
    CNP:                Field.String(),
    nume_utilizator:    Field.String(),
    mail:               Field.String(),
    adresa:             Field.String(),
    is_helpdesk:        Field.Boolean()
  }

  static collection = 'Client'

  static all() {
    return Model.all(Client.collection)
  }

  static create(data) {
    return Model.create(Client.collection, Client._fields, data)
  }
}
