import Field from './Field'
import Model from './Model'

export default class ClientAccountCreation {
  static _fields = {
    client: Field.ForeignKey()
  }

  static collection = 'ClientAccountCreation'

  static all() {
    return Model.all(ClientAccountCreation.collection)
  }

  static create(data) {
    return Model.create(ClientAccountCreation.collection, ClientAccountCreation._fields, data)
  }
}
