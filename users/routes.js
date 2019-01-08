

const router = exports = module.exports = {}

// ----------------------------- /users route ----------------------------- //
router['/users'] = {


  /**
   * Gets information about a user
   *
   *
   *
   * Success Returned Data:
   */
  // GET: (req, res) => {
  //   res.writeHead(200)

  //   const data = {
  //     statusCode: 200,
  //     data: 'get users'
  //   }

  //   res.end(JSON.stringify(data))
  // },



  /**
   * ----------- Create a new user -----------
   *
   * TODO: Check if the user exists already, status code if user exists: ?
   * TODO: ADD new user to the database if they do not already exist, status code: ?
   *
   * * Required Data:
   *    - name (first, last)
   *    - email
   *    - address (line1, line2, city, state, zip, country)
   *    - password
   *
   * * Success Returned Codes:
   *    - 201 (Created)
   *
   * * Error Codes:
   *     - 400 (Bad Request)          Missing required data fields
   *     - 422 (Unprocessable Entity) Data fields do not pass validation /
   *     - 409 (Conflict)             user already exists
   *     - 500 (Internal Server Error)
   *
   * * Returned Data:
   *    - Object created, less password
   */

  POST: async (req, res) => {
    res.writeHead(200)
    res.end('Success')
  },



  /**
   * Change User information
   *
   * TODO: Check if the user exists already, status code if user exists: ?
   * TODO: ADD new user to the database if they do not already exist, status code: ?
   *
   * Required Data: name, email, address, street address, password
   *
   * !REQUIRES TOKEN
   *
   * Success Returned Data:
   */
  PUT: async (req, res) => {

  },



  /**
   * Deletes user that already exists
   *
   * TODO: REMOVE user from the database even if they do not exist, status code: ?
   *
   * Required Data: name, email, address, street address, password
   *
   * !REQUIRES TOKEN
   *
   * Success Returned Data:
   */
  DELETE: async (req, res) => {

  }
}

// ----------------------------- /users/cart route ----------------------------- //

router['/users/cart'] = {


  /**
   * GET all of the items in the cart
   *
   * !REQUIRES TOKEN
   *
   * Success Returned Data:
   */
  GET: async (req, res) => {

  },



  /**
   * Remove ALL items from a cart
   *
   * !REQUIRES TOKEN
   *
   * Success Returned Data:
   */
  DELETE: async (req, res) => {

  }
}

router['/users/cart/item'] = {


  /**
   * ADD item(s) in the cart
   *
   * Use this to change quantities. If user
   *      changes the quantity it will overwrite with the new quantity
   *
   * !REQUIRES TOKEN
   *
   * Success Returned Data:
   */
  POST: async (req, res) => {

  },



  /**
   * Remove item(s) from a cart, full delete of a line item
   *
   * !REQUIRES TOKEN
   *
   * Success Returned Data:
   */
  DELETE: async (req, res) => {

  }
}
