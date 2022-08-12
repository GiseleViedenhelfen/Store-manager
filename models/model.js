const connection = require('./connect');

const getAll = async () => { 
  const [product] = await connection.query('SELECT * FROM StoreManager.products;');
  return product;
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
module.exports = {
  getAll,
  getById,
  newProduct,
};