const connection = require('./connect');
// produtos
const getAll = async () => { 
  const [product] = await connection.query('SELECT * FROM StoreManager.products;');
  return product;
};
const getSaleId = async () => {
  const [sale] = await connection.query('SELECT sale_id FROM StoreManager.sales_products;');
  return sale;
};
const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=?;';
  const [product] = await connection.execute(query, [id]);
  return product;
};
const newProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';
  const [result] = await connection.execute(query, [name]);
  return result;
};
// vendas
const getAllSales = async () => {
  const query = 'SELECT * FROM StoreManager.sales;';
  const [sale] = await connection.query(query);
  return sale;
};
const newSale = async (productId, quantity) => {
  const query = 'INSERT INTO StoreManager.sales_products (productId, quantity) VALUES (?,?);';
  const [result] = await connection.execute(query, [productId], [quantity]);
  return result;
};
module.exports = {
  getAll,
  getById,
  newProduct,
  getAllSales,
  newSale,
  getSaleId,
};