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
module.exports = {
  getAll,
  getById,
};