

class Router {
  constructor(allowedMethods) {
    console.log(allowedMethods)
    this.routes = {}
    this.allowedMethods = allowedMethods

    allowedMethods.forEach(method => this.routes[method] = {})
  }

  /**
   * I probably would have built out more functionality for the adding of routes, similar
   * to express, but I want to practice writing the node built ins a little more. It is
   * a little more coding and there is less reusability, but practice makes perfect!
   *
   * handler should be in the form (request, response) => { }
   */
  add(pathname, method, handler) {
    // eventually add sanity checker
    method = method.toUpperCase()
    pathname = pathname.toLowerCase()

    if(!this.routes[method]) throw new Error('Method DNE or not allowed')
    if(this.routes[method][pathname]) throw new Error(`[${method}] ${pathname} already exists`)

    this.routes[method][pathname] = handler
  }




  exists(method, pathname) {
    return Boolean(this.routes[method] && this.routes[method][pathname])
  }




  getHandler(method, pathname) { return this.routes[method][pathname] }


}

module.exports = exports = Router