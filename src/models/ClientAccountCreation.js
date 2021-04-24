import Field from './Field'
import Model from './Model'

export default class ClientAccountCreation {
  static _fields = {
    client: Field.ForeignKey()
  }

  static _collection = 'ClientAccountCreation'

  static all() {
    return Model.all(ClientAccountCreation._collection)
  }

  static create(data) {
    return Model.create(ClientAccountCreation._collection, ClientAccountCreation._fields, data)
  }
}
