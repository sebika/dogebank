import { db } from '../firebase'

class Field {
  static String() {
    return val => {
      return typeof val === "string"
    }
  }
}

export default class Client {
  static _fields = {
    nume:               Field.String(),
    prenume:            Field.String(),
    CNP:                Field.String(),
    nume_utilizator:    Field.String(),
    mail:               Field.String(),
    adresa:             Field.String()
  }

  static all() {
    return db.collection('Client')
  }

  static create(data) {
    // eslint-disable-next-line
    if (data == undefined)
      return

    const toSaveData = {}

    for (let property of Object.getOwnPropertyNames(Client._fields)) {
      // eslint-disable-next-line
      if (data[property] == undefined)
        throw new Error(`Property ${property} is not present on the object`)

      if (Client._fields[property](data[property]) === false)
        throw new Error(`Property ${property} is not of the correct type`)

      toSaveData[property] = data[property]
    }

    db.collection('Client').doc().set(data)
  }
}
