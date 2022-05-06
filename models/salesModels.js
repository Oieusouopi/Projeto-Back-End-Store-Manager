const connection = require('./connection');

const getAllSales = async () => {
    const query = `SELECT S.sale_id AS saleId, SA.date, S.product_id AS productId, quantity
    FROM StoreManager.sales_products AS S
    INNER JOIN StoreManager.sales AS SA
    ON S.sale_id = SA.id
    ORDER BY S.product_id ASC`;
    const [sales] = await connection.execute(query);
    return sales;
};

const getIdSales = async (id) => {
    const query = `SELECT SA.date, S.product_id AS productId, S.quantity
    FROM StoreManager.sales_products AS S
    INNER JOIN StoreManager.sales AS SA
    ON S.sale_id = SA.id
    WHERE sale_id = ?
    ORDER BY S.product_id ASC`;
    const [sale] = await connection.execute(query, [id]);
    return sale;
};

module.exports = {
    getAllSales,
    getIdSales,
};