const quantityValidation = (req, res, next) => {
  const arrayBody = req.body;
  const invalidNumber = arrayBody.filter((item) => Number(item.quantity) <= 0);
  const nullvalue = arrayBody.find((item) => item.quantity === undefined);
  if (nullvalue) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (invalidNumber.length > 0) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  quantityValidation,
};
