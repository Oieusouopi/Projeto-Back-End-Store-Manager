const router = require('express').Router();

const productsController = require('../controllers/ProductsController');

const salesController = require('../controllers/salesController');

router.get('/products', productsController.getAllProducts);

router.get('/products/:id', productsController.getIdProducts);

router.get('/sales', salesController.getAllSales);

router.get('/sales/:id', salesController.getIdSales);

router.post('/products', productsController.postProducts);

router.post('/sales', salesController.postSales);

router.put('/products/:id', productsController.putProducts);

router.put('/sales/:id', salesController.putSales);

router.delete('/products/:id', productsController.deleteProducts);

router.delete('/sales/:id', salesController.deleteSales);

module.exports = router;