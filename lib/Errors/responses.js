
const response = exports = module.exports = {}

response.error = async (req, res, message, code) => {

  res.writeHead(code)

  const payload = JSON.stringify({
    data: [],
    error: {
      message: message,
      statusCode: code,
      errorCode: null,
    }
  })

  res.end(payload)

}