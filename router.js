const Server = require('./lib/Server')

const anotherRouter = require('./anotherRouter')


const router = Server.Router()

router.addRoute('GET', '/hello', (req, res) => {
  res.writeHead(200, router.defaultHeaders)

  const data = {
    statusCode: 200,
    data: 'Hello, butts'
  }
  res.end(JSON.stringify(data))
})

router.addRoute('POST', '/hello', (req, res) => {
  console.log(req.headers)
  router.payloadHandler(req, load => {
    try {
      const parsed = JSON.parse(load)
      const data = {
        statusCode: 200,
        data: {
          message: 'payload recieved!',
          load: parsed
        }
      }
      res.writeHead(200, router.defaultHeaders)
      res.end(JSON.stringify(data))
    } catch (error) {
      router.generalErrorHandler(req, res)
    }
  })
})

// this allows separating logic into different files
router.combineRouters(anotherRouter)

module.exports = router
