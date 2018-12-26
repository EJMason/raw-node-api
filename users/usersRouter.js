
const router = {
  '/users': {
    GET: (req, res) => {
      res.writeHead(200)

      const data = {
        statusCode: 200,
        data: 'get users'
      }

      res.end(JSON.stringify(data))
    }
  }
}





module.exports = exports = router