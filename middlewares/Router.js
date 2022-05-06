const router = require('express').Router();

const productsController = require('../controllers/ProductsController');

const salesController = require('../controllers/salesController');

router.get('/products', productsController.getAllProducts);

router.get('/products/:id', productsController.getIdProducts);

router.get('/sales', salesController.getAllSales);

router.get('/sales/:id', salesController.getIdSales);

module.exports = router;