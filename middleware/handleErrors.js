const ERROR_HANDLERS = {
    defaultError: (res, error) => {
      console.error(error.name)
      res.status(500).json({ error: 'Internal error' })
    }
  }
  
  module.exports = (error, request, response, next) => {
    const handler =
      ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
      handler(response, error)
  }
  