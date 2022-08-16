const model = require('../models/model');
// produtos
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
// vendas
const getSaleId = async () => {
  const sale = await model.getSaleId();
  return sale;
};

const getSaleProduct = async () => {
  const sale = await model.getSaleProduct();
  return sale;
};
const getAllSales = async () => {
  const sale = await model.getAllSales();
  return sale;
};
const getSaleById = async (id) => {
  const sale = await model.getSaleById(id);
  return sale;
};
const newSale = async (productId, quantity) => {
  const sale = await model.newProduct(productId, quantity);
  return sale;
};
const editProduct = async (name, id) => {
  const result = await model.editProduct(name, id);
  return result;
};
module.exports = {
  getAll,
  getById,
  newProduct,
  getAllSales,
  newSale,
  getSaleId,
  getSaleProduct,
  getSaleById,
  editProduct,
};