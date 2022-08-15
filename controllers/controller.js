const service = require('../services/service');

const getAll = async (_req, res) => {
  const product = await service.getAll();
  return res.status(200).json(product);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const [product] = await service.getById(id);
  if (product === undefined || product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
};
const isNewProductValid = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};
const newProduct = async (req, res) => {
  const { name } = req.body;
  const result = await service.newProduct(name);
  return res.status(201).json({ id: result.insertId, name });
};
const getAllSales = async (req, res) => {
  const sale = await service.getAllSales();
  return res.status(200).json(sale);
};

const newSale = async (req, res) => {
  const IdSale = await service.getSaleId();
  const newId = IdSale[IdSale.length - 1].sale_id + 1;
  const arrayBody = req.body;
  arrayBody.forEach(async (item) => {
    await service.newSale(item.productId, item.quantity);
  });
  const result = {
    id: newId,
    itemsSold: 
      arrayBody.map((item) => ({
          productId: item.productId,
        quantity: item.quantity })),
  };
  return res.status(201).json(result);
};
module.exports = {
  getAll,
  getById,
  isNewProductValid,
  newProduct,
  getAllSales,
  newSale,
};
