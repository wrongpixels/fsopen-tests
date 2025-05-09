class CustomError extends Error {
  constructor(
    message = 'There was an error with the request',
    name = 'CustomError',
    status = 500
  ) {
    super(message)
    this.name = name
    this.status = status
  }
}

module.exports = CustomError
