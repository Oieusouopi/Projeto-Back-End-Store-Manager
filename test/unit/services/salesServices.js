const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const { mockSales, arrayMockSalesModules, invalidObjectModules, validObjectModules } = require('../../helpers/mockSales');

const salesModels = require('../../../models/salesModels');
const salesServices = require('../../../services/salesServices');

describe('teste da função de pegar todos sales na service', () => {
  beforeEach(() => {
    sinon.stub(salesModels, 'getAllSales').resolves(arrayMockSalesModules)
  });

  afterEach(() => {
    salesModels.getAllSales.restore();
  });

  it('se retorna uma array',async () => {
    const sales = await salesServices.getAllSales();
    expect(sales).to.be.an('array');
  });

  it('se retorna tem a propriedade saleId',async () => {
    const [[sales]] = await salesServices.getAllSales();
    expect(sales).to.have.property('saleId');
  });

  it('se retorna tem a propriedade date',async () => {
    const [[sales]] = await salesServices.getAllSales();
    expect(sales).to.have.property('date');
  });

  it('se retorna tem a propriedade productId',async () => {
    const [[sales]] = await salesServices.getAllSales();
    expect(sales).to.have.property('productId');
  });

  it('se retorna tem a propriedade quantity',async () => {
    const [[sales]] = await salesServices.getAllSales();
    expect(sales).to.have.property('quantity');
  });

});