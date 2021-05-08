import Field from './Field'
import Model from './Model'

export default class BankAccount {
  static _fields = {
    client:             Field.ForeignKey(),
    IBAN:               Field.String(),
    moneda:             Field.String(),
    nume:               Field.String(),
    suma:               Field.Number()
  }

  static collection = 'BankAccount'

  static all() {
    return Model.all(BankAccount.collection)
  }

  static create(data) {
    return Model.create(BankAccount.collection, BankAccount._fields, data)
  }
}
