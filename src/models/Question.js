import Field from './Field'
import Model from './Model'

export default class Question {
  static _fields = {
    client:             Field.ForeignKey(),
    intrebare:          Field.String()
  }

  static collection = 'Question'

  static all() {
    return Model.all(Question.collection)
  }

  static create(data) {
    return Model.create(Question.collection, Question._fields, data)
  }
}
