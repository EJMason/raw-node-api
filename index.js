const app = require('./appHttp')
const errorLib = require('./lib/Errors')



app.bootstrap().start()



errorLib.errorHandler()


// process.once('SIGINT', () => {
//   console.log('\n\nSIGINT SIGNAL RECEIVED... goodbye....')

//   if(app.server) {
//     app.server.close(() => {
//       console.log('The server has been closed successfully')
//       process.exit(0)
//     })
//   }
// })
