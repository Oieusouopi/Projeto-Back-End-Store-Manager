const { describe, it } = require('mocha');
const { expect } = require('chai');

const salesModels = require('../../../models/salesModels');
const mochObject = 	{
    DATEMOCH: "2022-05-07T00:25:03.000Z",
    SUCESSPRODUCTID: 1,
    QUANTITYMOCH: 5
};

const INVALIDPRODUCTID = 10;

describe('teste para a função', () => {
  it('getAllSales no models é um objeto', async () => {
    const [sales] = await salesModels.getAllSales();
    expect(sales).to.be.an('object');
  });

  it('getIdSales no models é uma array', async () => {
    const { SUCESSPRODUCTID } = mochObject;
    const salesId = await salesModels.getIdSales(SUCESSPRODUCTID);
    expect(salesId).to.be.an('array');
  });

//   it('getIdSales no models é um objeto com as propriedades corretas', async () => {
//     const { SUCESSPRODUCTID, DATEMOCH, QUANTITYMOCH } = mochObject;
//     const [salesId] = await salesModels.getIdSales(SUCESSPRODUCTID);
//     const { date, productId, quantity } = salesId;
//     expect(productId).to.equal(SUCESSPRODUCTID);
//     expect(date).to.equal(DATEMOCH);
//     expect(quantity).to.equal(QUANTITYMOCH);
//   });

  it('getIdSales com id inexistente retorna vazio', async () => {
    const [salesId] = await salesModels.getIdSales(INVALIDPRODUCTID);
    expect(salesId).to.be.an('undefined');
  });

  it('getAllProducts tem a propriedade id', async () => {
    const [sales] = await salesModels.getAllSales();
    expect(sales).to.have.property('productId');
  });

  it('getAllProducts tem a propriedade name', async () => {
    const [sales] = await salesModels.getAllSales();
    expect(sales).to.have.property('date');
  });

  it('getAllProducts tem a propriedade quantity', async () => {
    const [sales] = await salesModels.getAllSales();
    expect(sales).to.have.property('quantity');
  });

});