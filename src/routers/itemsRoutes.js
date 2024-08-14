const itemsController = require('../controllers/itemsController');
const { checkPermissions } = require('../midllewares/checkPermissions');


const itemsRoutes = {
  '/items': {
    GET: [checkPermissions(['read']), itemsController.getItems],
    // itemsController.getItems,
    POST: itemsController.createItem,
  },
  '/items/\\d+': {
    PUT: itemsController.updateItem,
    DELETE: itemsController.deleteItem,
  }
};

module.exports = itemsRoutes;