const model = require('../models/model');

const getAll = async () => { 
  const product = await model.getAll();
  return product;
};
const getById = async (id) => { 
  const product = await model.getById(id);
  return product;
};
const newProduct = async (name) => {
  const product = await model.newProduct(name);
  return product;
};
module.exports = {
  getAll,
  getById,
  newProduct,
};