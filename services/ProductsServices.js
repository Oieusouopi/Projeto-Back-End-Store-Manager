const productsModels = require('../models/productsModels');
const validMessageCode = require('./validMessageCode');

// HELPERS
const httpCode = require('../helpers/httpCode');
const message = require('../helpers/message');

const getAllProducts = async () => {
  const products = await productsModels.getAllProducts();
  return products;
};

const getIdProducts = async (id) => {
  const [product] = await productsModels.getIdProducts(id);
  if (!product) throw validMessageCode(httpCode.NOT_FOUND, message.PRODUCT_NOT_FOUND);
  return product;
};

const validName = (name) => {
 if (!name) throw validMessageCode(httpCode.BAD_REQUEST, message.NAME_REQUIRED);
 if (name.length < 5) {
   throw validMessageCode(httpCode.UNPROCESSABLE, message.NAME_LENGTH);
 }
 return false;
};

const validQuantity = (quantity) => {
  if (!quantity) throw validMessageCode(httpCode.BAD_REQUEST, message.QUANTITY_REQUIRED);
  if (quantity <= 0) throw validMessageCode(httpCode.UNPROCESSABLE, message.QUANTITY_SIZE);
  if (typeof (quantity) !== 'number') {
    throw validMessageCode(httpCode.BAD_REQUEST, message.QUANTITY_TYPE);
  }
};

const validProductExist = async (name) => {
 const products = await productsModels.getAllProducts();
 const productFilter = products.filter((product) => product.name === name);
 if (productFilter.length > 0) throw validMessageCode(httpCode.CONFLICT, message.PRODUCT_EXIST);
};

const postProducts = async (name, quantity) => {
  validName(name);
  validQuantity(quantity);
  await validProductExist(name);
  await productsModels.postProducts(name, quantity);
  const [product] = await productsModels.getNameProduct(name);
  return product;
};

module.exports = {
    getAllProducts,
    getIdProducts,
    validQuantity,
    validName,
    postProducts,
};