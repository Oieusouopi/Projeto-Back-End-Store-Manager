const productsServices = require('../services/ProductsServices');

// HELPERS
const httpCode = require('../helpers/httpCode');

const getAllProducts = async (__req, res) => {
  const products = await productsServices.getAllProducts();
  res.status(httpCode.OK).json(products);
};

const getIdProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsServices.getIdProducts(id);
    return res.status(httpCode.OK).json(product);
  } catch (error) {
    next(error);
  }
};

const postProducts = async (req, res, next) => {
 try {
   const { name, quantity } = req.body;
   const { message, code } = await productsServices.postProducts(name, quantity);
   return res.status(code).json({ message });
 } catch (error) {
   next(error);
 }
};

module.exports = {
  getAllProducts,
  getIdProducts,
  postProducts,
};