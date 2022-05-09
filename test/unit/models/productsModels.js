const { describe, it } = require('mocha');
const { expect } = require('chai');

const productsModels = require('../../../models/productsModels');
const mochObject = {
	SUCESSPRODUCTID: 1,
	NAMEMOCH: "Martelo de Thor",
	QUANTITYMOCH: 10
}
const INVALIDPRODUCTID = 10;

describe('teste para a função', () => {
  it('getAllProducts no models é um objeto', async () => {
    const [products] = await productsModels.getAllProducts();
    expect(products).to.be.an('object');
  });

  it('getIdProducts no models é um objeto', async () => {
    const { SUCESSPRODUCTID } = mochObject;
    const [productsId] = await productsModels.getIdProducts(SUCESSPRODUCTID);
    expect(productsId).to.be.an('object');
  });

  it('getIdProducts no models é um objeto com as propriedades corretas', async () => {
    const { SUCESSPRODUCTID, NAMEMOCH, QUANTITYMOCH } = mochObject;
    const [productsId] = await productsModels.getIdProducts(SUCESSPRODUCTID);
    const { id, name, quantity } = productsId;
    expect(id).to.equal(SUCESSPRODUCTID);
    expect(name).to.equal(NAMEMOCH);
    expect(quantity).to.equal(QUANTITYMOCH);
  });

  it('getIdProducts com id inexistente retorna vazio', async () => {
    const [productsId] = await productsModels.getIdProducts(INVALIDPRODUCTID);
    expect(productsId).to.be.an('undefined');
  });

  it('getAllProducts tem a propriedade id', async () => {
    const [products] = await productsModels.getAllProducts();
    expect(products).to.have.property('id');
  });

  it('getAllProducts tem a propriedade name', async () => {
    const [products] = await productsModels.getAllProducts();
    expect(products).to.have.property('name');
  });

  it('getAllProducts tem a propriedade quantity', async () => {
    const [products] = await productsModels.getAllProducts();
    expect(products).to.have.property('quantity');
  });

});