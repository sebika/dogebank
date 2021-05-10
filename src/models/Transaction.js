import Field from './Field'
import Model from './Model'

export default class Transaction {
  static _fields = {
    expeditor:              Field.ForeignKey(),
    destinatar:             Field.ForeignKey(),
    suma:                   Field.Number(),
    moneda:                 Field.String(),
    mesaj:                  Field.String(),
    data:                   Field.Number()
  }

  static collection = 'Transaction'

  static all() {
    return Model.all(Transaction.collection)
  }

  static create(data) {
    return Model.create(Transaction.collection, Transaction._fields, data)
  }
}
