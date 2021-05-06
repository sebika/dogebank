export default class Field {
  static ForeignKey() {
    return val => {
      return typeof val === 'object'
        && val.hasOwnProperty('collection') && typeof val['collection'] === 'string'
        && val.hasOwnProperty('id') && typeof val['id'] === 'string'
    }
  }

  static String() {
    return val => {
      return typeof val === 'string'
    }
  }

  static Boolean() {
    return val => {
      return typeof val === 'boolean'
    }
  }

  static Number() {
    return val => {
      return typeof val === 'number'
    }
  }
}
