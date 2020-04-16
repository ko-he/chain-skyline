class Passenger {
  constructor(
    id,
    firstName,
    lastName,
    contryCode
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.contryCode = contryCode
  }

  /**
   * 
   * @param {object} json 
   * @returns {Passenger}
   */
  static fromJson(json) {
    return new Passenger(
      json.id,
      json.firstName,
      json.lastName,
      json.contryCode
    )
  }
}