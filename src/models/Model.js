import { db } from '../firebase'

export default class Model {
  static all(collection) {
    return db.collection(collection)
  }

  static create(collection, fields, data) {
    // eslint-disable-next-line
    if (data == undefined)
      return

    const toSaveData = {}

    for (let property of Object.getOwnPropertyNames(fields)) {
      // eslint-disable-next-line
      if (data[property] == undefined)
        throw new Error(`Property ${property} is not present on the object`)

      if (fields[property](data[property]) === false)
        throw new Error(`Property ${property} is not of the correct type`)

      toSaveData[property] = data[property]
    }

    return db.collection(collection).doc().set(data)
  }
}
