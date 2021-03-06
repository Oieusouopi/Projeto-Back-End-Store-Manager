const salesModels = require('../models/salesModels');
const validMessageCode = require('./validMessageCode');
// const productsModels = require('../models/productsModels');

// HELPERS
const httpCode = require('../helpers/httpCode');
const message = require('../helpers/message');

const getAllSales = async () => {
  const sales = await salesModels.getAllSales();
  return sales;
};

const validSaleNotFound = (sale) => {
  if (sale.length === 0) throw validMessageCode(httpCode.NOT_FOUND, message.SALE_NOT_FOUND);
};

const getIdSales = async (id) => {
  const sale = await salesModels.getIdSales(id);
  validSaleNotFound(sale);
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

//  const validProductNotExist = async (productId) => {
//   const [product] = await productsModels.getIdProducts(productId);
//   console.log(product);
//  };

const arrayMapvalid = (array) => {
    array.map((sale) => {
    const { quantity, productId } = sale;
    validQuantity(quantity);
    validProductId(productId);
    // await validProductNotExist(productId);
    return sale; 
  });
};

const postSales = async (arraySale) => {
  await arrayMapvalid(arraySale);
  const id = await salesModels.createSale();
  arraySale.map(async (sale) => {
  const { quantity, productId } = sale;
  await salesModels.postSales(id, productId, quantity);
});
  return { id, itemsSold: arraySale };
};

const putSales = async (saleId, arraySale) => {
  arrayMapvalid(arraySale);
  arraySale.map(async (sale) => {
    const { quantity, productId } = sale;
    await salesModels.putSales(productId, quantity);
  });
  const objectResult = { saleId, itemUpdated: arraySale };
  return objectResult;
};

const deleteSales = async (id) => {
  const sale = await salesModels.getIdSales(id);
  validSaleNotFound(sale);
  await salesModels.deleteSales(id);
  return true;
};

module.exports = {
    getAllSales,
    getIdSales,
    validQuantity,
    validProductId,
    validSaleId,
    postSales,
    putSales,
    deleteSales,
};