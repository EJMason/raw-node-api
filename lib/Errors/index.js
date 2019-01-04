const httpInstance = require('../../appHttp')


exports.errorHandler = (appInstance) => {

  if(appInstance) {
    console.log('yes, there is an app instance...')
  }

  // log errors here....

}

// ----------------------------- Start up stuff ----------------------------- //


// graceful shutdown of ctrl+c
process.once('SIGINT', () => {
  console.log('\n\nSIGINT SIGNAL RECEIVED... goodbye....')


  if(httpInstance.server) {
    httpInstance.server.close(() => {
      console.log('The http server has been closed successfully')


          // ? Any other clean up that needs to go here????


      process.exit(0)
    })
  }
})