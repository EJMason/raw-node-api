
const router = {
  '/users': {


    /**
     * Gets information about a user
     *
     * TODO: Check if the user exists already, status code if user exists: ?
     * TODO: ADD new user to the database if they do not already exist, status code: ?
     *
     * Required Data: name, email, address, street address, password
     *
     * Success Returned Data:
     */
    GET: (req, res) => {
      res.writeHead(200)

      const data = {
        statusCode: 200,
        data: 'get users'
      }

      res.end(JSON.stringify(data))
    },



    /**
     * Create a new user
     *
     * TODO: Check if the user exists already, status code if user exists: ?
     * TODO: ADD new user to the database if they do not already exist, status code: ?
     *
     * Required Data: name, email, address, street address, password
     *
     * Success Returned Data:
     */
    POST: (req, res) => {

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
    PUT: (req, res) => {

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
    DELETE: (req, res) => {

    },
  }
}

// ----------------------------- /users/token route ----------------------------- //


router['/users/token'] = {

  /**
   * Login endpoint, returns a token if login success
   *
   * Required Data:
   *
   * Success Returned Data
   */
  POST: (req, res) => {

  },


    /**
   * Logout endpoint, deletes a token from DB if logout success
   *
   * Required Data:
   *
   * Success Returned Data:
   */
  DELETE: (req, res) => {

  }
}




module.exports = exports = router