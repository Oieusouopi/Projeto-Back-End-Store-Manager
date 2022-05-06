const productsServices = require('../services/ProductsServices');

const getAllProducts = async (__req, res) => {
  const products = await productsServices.getAllProducts();
  res.status(200).json(products);
};

const getIdProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { product, code } = await productsServices.getIdProducts(id);
    return res.status(code).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getIdProducts,
};