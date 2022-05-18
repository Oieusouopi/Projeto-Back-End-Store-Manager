const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

// const restoreDb = require('../../restoreDb');
const connection = require('../../../models/connection');

const salesModels = require('../../../models/salesModels');

// HELPERS
const { mockSales, arrayMockSalesModules, invalidObjectModules, validObjectModules } = require('../../helpers/mockSales');

describe('teste para a função de pegar todas as vendas na models', () => {

  beforeEach(() => {
    sinon.stub(connection, 'execute').resolves(arrayMockSalesModules)
  });

  afterEach(() => {
    connection.execute.restore();
  });

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

describe('teste para a função de pegar o id de Sales com id correto na models', () => {

  beforeEach(() => {
    sinon.stub(connection, 'execute').resolves(validObjectModules);
  });

  afterEach(() => {
    connection.execute.restore();
  });

  it('É um objeto', async () => {
    const { SUCESSPRODUCTID } = mockSales;
    const salesId = await salesModels.getIdSales(SUCESSPRODUCTID);
    expect(salesId).to.be.an('object');
  });

  it('getIdSales no models é um objeto com as propriedades corretas na models', async () => {
    const { SUCESSPRODUCTID, DATEMOCK, QUANTITYMOCK } = mockSales;
    const salesId = await salesModels.getIdSales(SUCESSPRODUCTID);
    const { date, productId, quantity } = salesId;
    expect(productId).to.equal(SUCESSPRODUCTID);
    expect(date).to.equal(DATEMOCK);
    expect(quantity).to.equal(QUANTITYMOCK);
  });


});

describe('teste para a função de pegar o id de Sales com id incorreto na models', () => {

  beforeEach(() => {
    const returnFunc = [];
    sinon.stub(connection, 'execute').resolves(returnFunc);
  });

  afterEach(() => {
    connection.execute.restore();
  });

  it('Uma id inexistente retorna vazio', async () => {
    const { INVALIDPRODUCTID } = invalidObjectModules;
    const salesId = await salesModels.getIdSales(INVALIDPRODUCTID);
    expect(salesId).to.be.an('undefined');
  });

});

describe('teste da função de criar um cliente na models', () => {

  beforeEach(() => {
    const result = [{insertId: 1}]
    sinon.stub(connection, 'execute').resolves(result);
  });

  afterEach(() => {
    connection.execute.restore();
  });

  it('retorna um number', async () => {
    const saleId = await salesModels.createSale();
    expect(saleId).to.be.an('number');
  })

});

describe('teste da função de criar um item vendido na models', () => {

  beforeEach(() => {
    sinon.stub(connection, 'execute').resolves(true);
    });

  afterEach(() => {
    connection.execute.restore();
  });

  it('se retorna true', async () => {
    const { SUCESSSALESID, SUCESSPRODUCTID, QUANTITYMOCK } = mockSales;
    const returnFunc = await salesModels.postSales(SUCESSSALESID, SUCESSPRODUCTID, QUANTITYMOCK);;
    expect(returnFunc).to.be.true;
  });

});

describe('teste da função que atualiza um item vendido na models', () => {

  beforeEach(() => {
    sinon.stub(connection, 'execute').resolves(true);
  });

  afterEach(() => {
    connection.execute.restore();
  });

  it('se retorna true', async () => {
    const { SUCESSPRODUCTID, QUANTITYMOCK } = mockSales;
    const returnFunc = await salesModels.putSales(SUCESSPRODUCTID, QUANTITYMOCK);
    expect(returnFunc).to.be.true;
  });

});