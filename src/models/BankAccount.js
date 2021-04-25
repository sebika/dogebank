import Field from './Field'
import Model from './Model'

export default class BankAccount {
  static _fields = {
    client:             Field.ForeignKey(),
    IBAN:               Field.String(),
    moneda:             Field.String()
  }

  static collection = 'BankAccount'

  static all() {
    return Model.all(Client.collection)
  }

  static create(data) {
    return Model.create(Client.collection, Client._fields, data)
  }
  
}