const productsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const products = await productsModels.getAllProducts();
  return products;
};

const getIdProducts = async (id) => {
  const objectError = { code: 404, message: 'Product not found' };
  const [product] = await productsModels.getIdProducts(id);
  if (!product) throw objectError;
  return { code: 200, product };
};

module.exports = {
    getAllProducts,
    getIdProducts,
};