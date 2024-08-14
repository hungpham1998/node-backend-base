
const getItems = (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(items));
  };
  
  const createItem = (req, res) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newItem = JSON.parse(body);
      items.push(newItem);
      res.statusCode = 201;
      res.end(JSON.stringify(newItem));
    });
  };
  
  const updateItem = (req, res, id) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const updatedItem = JSON.parse(body);
      items[id] = updatedItem;
      res.statusCode = 200;
      res.end(JSON.stringify(updatedItem));
    });
  };
  
  const deleteItem = (req, res, id) => {
    items.splice(id, 1);
    res.statusCode = 204;
    res.end();
  };
  
  module.exports = {
    getItems,
    createItem,
    updateItem,
    deleteItem
  };
  