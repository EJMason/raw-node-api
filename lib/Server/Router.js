

class Router {
  constructor(allowedMethods) {
    this.routes = {}
    this.allowedMethods = allowedMethods
    console.log(allowedMethods)
  }

  /**
   * I probably would have built out more functionality for the adding of routes, similar
   * to express, but I want to practice writing the node built ins a little more. It is
   * a little more coding and there is less reusability, but practice makes perfect!
   *
   * handler should be in the form (request, response) => { }
   */


  // TODO: CONTINUE HERE... MAKE SURE TO REFACTOR ALL TO [PATHNAME][METHOD]
  add(router) {
    Object.keys(router).forEach(pathname => {
      const _pathname = pathname.toLowerCase()
      if(!this.routes[_pathname]) {
        this.routes[_pathname] = {}
      }

      Object.keys(router[pathname]).forEach(method => {
        const _method = method.toUpperCase()

        if(this.allowedMethods.includes(_method)) {
          this.routes[_pathname][_method] = router[pathname][method]
        }

      })
    })
  }



  exists(method, pathname) {
    return Boolean(this.routes[pathname] && this.routes[pathname][method])
  }




  getHandler(pathname, method) { return this.routes[pathname][method] }


}

module.exports = exports = Router