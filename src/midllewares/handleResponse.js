const httpStatus = require('http-status');

const _handle = async (req, res, func, successMessage) => {
  const dataRes = await func(req);
  return res.status(httpStatus.OK).send({
    msg: successMessage,
    data: dataRes,
    success: true,
  });
};

module.exports = {
  _handle,
};
