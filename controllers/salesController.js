const salesServices = require('../services/salesServices');

// HELPERS
const httpCode = require('../helpers/httpCode');

const getAllSales = async (__req, res) => {
  const sales = await salesServices.getAllSales();
  res.status(httpCode.OK).json(sales);
};
  
const getIdSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.getIdSales(id);
    return res.status(httpCode.OK).json(sale);
  } catch (error) {
    next(error);
    }
};

const postSales = async (req, res, next) => {
 try {
     const arraySale = req.body;
     const sale = await salesServices.postSales(arraySale);
     res.status(httpCode.CREATED).json(sale);
 } catch (error) {
     next(error);
 }
};

module.exports = {
  getAllSales,
  getIdSales,
  postSales,
};
