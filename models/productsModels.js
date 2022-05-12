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

const getNameProduct = async (name) => {
    const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
    const [product] = await connection.execute(query, [name]);
    return product;
   };

const postProducts = async (name, quantity) => {
    const query = 'INSERT INTO StoreManager.products (name,quantity) values(?,?)';
    await connection.execute(query, [name, quantity]);
    return true;
};

const putProducts = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [name, quantity, id]);
  return true;
};

module.exports = {
    getAllProducts,
    getIdProducts,
    getNameProduct,
    postProducts,
    putProducts,
};