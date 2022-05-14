const { describe, it } = require('mocha');
const { expect } = require('chai');

const restoreDb = require('../../restoreDb');

const salesModels = require('../../../models/salesModels');

// HELPERS
const { mockSales } = require('../../helpers/mockSales');

describe('teste para a função de pegar todas as vendas', () => {

  it('É uma array', async () => {
    const sales = await salesModels.getAllSales();
    expect(sales).to.be.an('array');
  });

  it('tem a propriedade id', async () => {
    const [sales] = await salesModels.getAllSales();
    expect(sales).to.have.property('productId');
  });

  it('tem a propriedade name', async () => {
    const [sales] = await salesModels.getAllSales();
    expect(sales).to.have.property('date');
  });

  it('tem a propriedade quantity', async () => {
    const [sales] = await salesModels.getAllSales();
    expect(sales).to.have.property('quantity');
  });
});

describe('teste para a função de pegar o id de Sales', () => {

  it('É uma array', async () => {
    const { SUCESSPRODUCTID } = mockSales;
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

  it('Uma id inexistente retorna vazio', async () => {
    const { INVALIDPRODUCTID } = mockSales;
    const [salesId] = await salesModels.getIdSales(INVALIDPRODUCTID);
    expect(salesId).to.be.an('undefined');
  });

});

describe('teste da função de criar um cliente', () => {

  it('retorna um number', async () => {
    const saleId = await salesModels.createSale();
    expect(saleId).to.be.an('number');
  })

});

describe('teste da função de criar um item vendido', () => {

  beforeEach(async () => {
    await restoreDb();
    });

  it('se retorna true', async () => {
    const { SUCESSSALESID, SUCESSPRODUCTID, QUANTITYMOCK } = mockSales;
    const returnFunc = await salesModels.postSales(SUCESSSALESID, SUCESSPRODUCTID, QUANTITYMOCK);;
    expect(returnFunc).to.be.true;
  });

});

describe('teste da função que atualiza um item vendido', () => {

  beforeEach(async () => {
    await restoreDb();
    });

  it('se retorna true', async () => {
    const { SUCESSPRODUCTID, QUANTITYMOCK } = mockSales;
    const returnFunc = await salesModels.putSales(SUCESSPRODUCTID, QUANTITYMOCK);
    expect(returnFunc).to.be.true;
  });

});