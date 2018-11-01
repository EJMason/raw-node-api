const http = require('http');

const Server = require('./lib/Server')
const router = require('./router')

const config = {
  nodeEnv: 'development',
  httpOptions: {
    port: 3000,
    path: 'localhost'
  }
};

const buildServer = function() {
  // bootstrap the routes
  return http.createServer((req, res) => {
    const action = router.requestHandler(req, res)
    action(req, res)
  })
}

const httpServer = buildServer().listen(3000, () => {
    console.log(`
    --------- HTTP Server Started ---------
    node_env: \t${config.nodeEnv}
    type: \thttp
    port: \t${config.httpOptions.port}
    url: \thttp://localhost:3000
    `)
  });



if(httpServer.listening) {
  console.log('Server is listening!')
  httpServer.on('request', (req, res) => {
    console.log('There was a request!')
  })
}

