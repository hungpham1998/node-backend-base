const usersController = require('../controllers/usersController');

const usersRoutes = {
  '/users': {
    GET: usersController.getUsers,
    POST: usersController.createUser,
  },
  '/users/\\d+': {
    PUT: usersController.updateUser,
    DELETE: usersController.deleteUser,
  }
};

module.exports = usersRoutes;