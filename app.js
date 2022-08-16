const express = require('express');
const controller = require('./controllers/controller');
const saleMiddle = require('./middlewares/saleMiddle');
const productMiddle = require('./middlewares/productMiddle');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// produtos 
app.get('/products', controller.getAll);
app.get('/products/:id', controller.getById);
app.post(
  '/products',
  controller.isNewProductValid,
  controller.newProduct,
);

// vendas
app.get('/sales', controller.getAllSales);
app.get('/sales/:id', controller.getSaleById);
app.post(
  '/sales',
  productMiddle.notNullProductIdValidation,
  saleMiddle.quantityValidation,
  productMiddle.productIdValidation,
  controller.newSale,
);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação

module.exports = app;
