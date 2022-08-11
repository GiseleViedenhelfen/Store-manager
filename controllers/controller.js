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
module.exports = {
  getAll,
  getById,
};