const connection = require('./connection');

const getAllProducts = async () => {
    const query = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.execute(query);
    return products;
};

const getIdProducts = async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [product] = await connection.execute(query, [id]);
    return product;
};

const postProducts = async (name, quantity) => {
    const query = 'INSERT INTO StoreManager.products (name,quantity) values(?,?)';
    await connection.execute(query, [name, quantity]);
    return true;
};

module.exports = {
    getAllProducts,
    getIdProducts,
    postProducts,
};