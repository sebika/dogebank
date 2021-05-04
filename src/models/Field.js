export default class Field {
  static String() {
    return val => {
      return typeof val === 'string'
    }
  }

  static ForeignKey() {
    return val => {
      return typeof val === 'object'
        && val.hasOwnProperty('collection') && typeof val['collection'] === 'string'
        && val.hasOwnProperty('id') && typeof val['id'] === 'string'
    }
  }

  static Boolean() {
    return val => {
      return typeof val === 'boolean'
    }
  }
}
