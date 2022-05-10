const salesModels = require('../models/salesModels');
const validMessageCode = require('./validMessageCode');

// HELPERS
const httpCode = require('../helpers/httpCode');
const message = require('../helpers/message');

const getAllSales = async () => {
  const sales = await salesModels.getAllSales();
  return sales;
};

const getIdSales = async (id) => {
  const sale = await salesModels.getIdSales(id);
  if (sale.length === 0) throw validMessageCode(httpCode.NOT_FOUND, message.SALE_NOT_FOUND);
  return sale;
};

const validProductId = (productId) => {
 if (!productId) throw validMessageCode(httpCode.BAD_REQUEST, message.PRODUCTID_REQUIRED);
 if (typeof (productId) !== 'number') {
   throw validMessageCode(httpCode.BAD_REQUEST, message.PRODUCTID_TYPE);
 }
 if (productId <= 0) throw validMessageCode(httpCode.BAD_REQUEST, message.PRODUCTID_SIZE);
};

const validQuantity = (quantity) => {
  if (!quantity) throw validMessageCode(httpCode.BAD_REQUEST, message.QUANTITY_REQUIRED);
  if (quantity <= 0) throw validMessageCode(httpCode.UNPROCESSABLE, message.QUANTITY_SIZE);
  if (typeof (quantity) !== 'number') {
    throw validMessageCode(httpCode.BAD_REQUEST, message.QUANTITY_TYPE);
  }
};

const validSaleId = (saleId) => {
  if (!saleId) throw validMessageCode(httpCode.BAD_REQUEST, message.SALEID_REQUIRED);
  if (typeof (saleId) !== 'number') {
    throw validMessageCode(httpCode.BAD_REQUEST, message.SALEID_TYPE);
  }
  if (saleId <= 0) throw validMessageCode(httpCode.BAD_REQUEST, message.SALEID_SIZE);
 };

const postSales = async (arraySale) => {
  arraySale.map((sale) => {
  const { quantity, product_id } = sale;
  validQuantity(quantity);
  validProductId(product_id);
  return sale;
});
  arraySale.map(async (sale) => {
  const { quantity, product_id } = sale;
  await salesModels.postSales(product_id, quantity);
});
  return { code: 200, message: 'successfully added your sale' };
};

module.exports = {
    getAllSales,
    getIdSales,
    validQuantity,
    validProductId,
    validSaleId,
    postSales,
};