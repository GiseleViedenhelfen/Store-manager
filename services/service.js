const model = require('../models/model');

const getAll = async () => { 
  const product = await model.getAll();
  return product;
};
const getById = async (id) => { 
  const product = await model.getById(id);
  return product;
};

module.exports = {
  getAll,
  getById,
};