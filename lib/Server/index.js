const url = require('url')

const obj = {}


obj.processRequestInfo = (req) => {

  // get the path information:
  const paths = url.parse(req.url).pathname.replace(/^\/+|\/+$/g, '').split('/')
  const router = '/' + paths.shift().toLowerCase()
  const subRoute = '/' + paths.join('/').toLowerCase()

   return {
     router,
     subRoute
   }
}

module.exports = obj