import Field from './Field'
import Model from './Model'

export default class Transaction {
  static _fields = {
    bank_account:           Field.ForeignKey(),
    src_IBAN:               Field.String(),
    dst_IBAN:               Field.String(),
    amount:                 Field.Number(),
    moneda:                 Field.String(),
    message:                Field.String()
  }

  static collection = 'Transaction'

  static all() {
    return Model.all(Client.collection)
  }

  static create(data) {
    return Model.create(Client.collection, Client._fields, data)
  }
}
