const httpInstance = require('../../appHttp')


exports.errorHandler = () => {


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




process.on('unhandledRejection', (reason, p) => {
  console.log('\n\n\n ----------------------------------------- ')
  console.log('Unhandled Rejection at:', p, 'reason:', reason);

});