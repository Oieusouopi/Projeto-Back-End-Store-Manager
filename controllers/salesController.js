const salesServices = require('../services/salesServices');

const getAllSales = async (__req, res) => {
    const sales = await salesServices.getAllSales();
    res.status(200).json(sales);
  };
  
  const getIdSales = async (req, res, next) => {
      try {
          const { id } = req.params;
          const { sale, code } = await salesServices.getIdSales(id);
          return res.status(code).json(sale);
      } catch (error) {
          next(error);
      }
  };
  
  module.exports = {
    getAllSales,
    getIdSales,
  };