const getUsers = (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  };
  
  const createUser = (req, res) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newUser = JSON.parse(body);
      users.push(newUser);
      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    });
  };
  
  const updateUser = (req, res, id) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const updatedUser = JSON.parse(body);
      users[id] = updatedUser;
      res.statusCode = 200;
      res.end(JSON.stringify(updatedUser));
    });
  };
  
  const deleteUser = (req, res, id) => {
    users.splice(id, 1);
    res.statusCode = 204;
    res.end();
  };
  
  module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
  };
