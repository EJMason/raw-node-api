const http = require('http');

const config = {
  nodeEnv: 'development',
  httpOptions: {
    port: 3000,
    path: 'localhost'
  }
};

const httpServer = http.createServer((req, res) => {
  //console.log(res)
  res.end('hello')

}).listen(3000, () => {
  console.log(`
  --------- HTTP Server Started ---------
  node_env: \t${config.nodeEnv}
  type: \thttp
  port: \t${config.httpOptions.port}
  url: \t\thttp://localhost:3000
  `)
});