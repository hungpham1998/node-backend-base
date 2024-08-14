const checkPermissions = (requiredPermissions) => (req, res, next) => {
    const userPermissions = req.user && req.user.permissions;
  
    if (!userPermissions) {
      res.statusCode = 403;
      return res.end(JSON.stringify({ message: 'Forbidden' }));
    }
  
    const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (hasPermission) {
      next();
    } else {
      res.statusCode = 403;
      res.end(JSON.stringify({ message: 'Forbidden' }));
    }
  };

  module.exports = {
    checkPermissions
  }