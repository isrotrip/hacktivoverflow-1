module.exports = {
  default(error, req, res) {
    try {
      let { message } = Object.values(error.errors)[0]
      res.status(400).json({
        message: message
      })
    }
    catch (error) {
      res.status(500).json({
        message: 'Internal server error'
      })
    }
  }
}