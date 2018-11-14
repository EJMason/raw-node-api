const app = require('../appHttp')

app.router.add('/users/test', 'GET', (req, res) => {
  res.writeHead(200)
  res.end(JSON.stringify({
    data: {
      statusCode: 200,
      message: 'this is a test'
    }
  }))
})