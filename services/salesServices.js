const salesModels = require('../models/salesModels');

const getAllSales = async () => {
  const sales = await salesModels.getAllSales();
  return sales;
};

const getIdSales = async (id) => {
  const objectError = { code: 404, message: 'Sale not found' };
  const sale = await salesModels.getIdSales(id);
  if (sale.length === 0) throw objectError;
  return { code: 200, sale };
};

module.exports = {
    getAllSales,
    getIdSales,
};