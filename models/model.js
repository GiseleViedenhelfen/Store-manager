const connection = require('./connect');
// produtos
const getAll = async () => { 
  const [product] = await connection.execute('SELECT * FROM StoreManager.products;');
  return product;
};
const getSaleId = async () => {
  const [sale] = await connection.execute('SELECT sale_id FROM StoreManager.sales_products;');
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
  const [sale] = await connection.execute('SELECT * FROM StoreManager.sales;');
  return sale;
};
const getSaleProduct = async () => {
  const query = `select SP.product_id, SP.sale_id, SP.quantity,
S.date from StoreManager.sales_products as SP
inner join StoreManager.sales as S
where SP.sale_id = S.id;`;
const [sale] = await connection.query(query);
return sale;
};
const getSaleById = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales_products WHERE sale_id=?;';
   const product = await connection.execute(query, [id]);
   return product;
};
const newSale = async (productId, quantity) => {
  const query = 'INSERT INTO StoreManager.sales_products (productId, quantity) VALUES (?,?);';
  const [result] = await connection.execute(query, [productId], [quantity]);
  return result;
};
// editar
const editProduct = async (name, id) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id=?;';
  const [result] = await connection.execute(query, [name, id]);
  return result;
};
 // deletar
const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id=?;';
  const result = await connection.execute(query, [id]);
  return result;
};
const deleteSale = async (id) => {
  const query = 'DELETE FROM StoreManager.sales_products WHERE sale_id=?;';
   const result = await connection.execute(query, [id]);
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
  deleteProduct,
  deleteSale,
};