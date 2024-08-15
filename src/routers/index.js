const httpStatus = require('http-status');
const itemsRoutes = require('./itemsRoutes');
const usersRoutes = require('./usersRoutes');

const routes = {
  ...itemsRoutes,
  ...usersRoutes,
};

const notFound = (req, res) => {
  res.statusCode = httpStatus.NOT_FOUND;
  res.end(JSON.stringify({ message: 'Not Found' }));
};

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  const url = req.url;
  const method = req.method;
  
  const matchedRoute = Object.keys(routes).find(route => {
    const regex = new RegExp(`^${route}$`);
    return regex.test(url);
  });

  if (matchedRoute) {
    const handler = routes[matchedRoute][method];
    if (handler) {
      const id = url.split('/')[2];
      handler(req, res, id);
    } else {
      notFound(req, res);
    }
  } else {
    notFound(req, res);
  }
};