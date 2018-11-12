

class Router {
  constructor(allowedMethods) {
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
  add(path, method, handler) {
    // eventually add sanity checker
    method = method.toUpperCase()
    path = path.toLowerCase()

    if(!this.routes[method]) throw new Error('Method DNE or not allowed')
    if(this.routes[method][path]) throw new Error(`[${method}] ${path} already exists`)

    this.routes[method][path] = handler


  }


}

module.exports = exports = Router