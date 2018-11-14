const app = require('./appHttp')

app
  .bootstrap()
  .start()

  console.log(app.router.routes)


