const model = require('../models/model');

const notNullProductIdValidation = (req, res, next) => {
  const arrayBody = req.body;
  let message;
  arrayBody.forEach((item) => {
    if (!item.productId) {
      message = true;
    }
  });
  if (message) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};
const productIdValidation = async (req, res, next) => {
  const arrayBody = req.body;
  const queryExistentsId = await model.getAll();
  const arrayExistentsIds = queryExistentsId.map((item) => item.id);
  const arrayBodyIds = arrayBody.map((item) => Number(item.productId));
  const matchIds = arrayBodyIds.filter((id) => !arrayExistentsIds.includes(id));
  if (matchIds.length > 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};
module.exports = {
  productIdValidation,
  notNullProductIdValidation,
};
