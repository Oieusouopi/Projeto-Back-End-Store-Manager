const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const salesServices = require('../../../services/salesServices');
const salesController = require('../../../controllers/salesController');
const { arrayMockSalesModules, validObjectModules } = require('../../helpers/mockSales');
const restoreDb = require('../../restoreDb');


describe('teste para a função de pegar todas as vendas na controller', () => {

    const req = {};
    const res = {};

    beforeEach(async () => {
        await restoreDb();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns()
  
        sinon.stub(salesServices, 'getAllSales').resolves(arrayMockSalesModules);    
    });

    afterEach(() => {
      salesServices.getAllSales.restore();
    });

    it('se o response é um status 200 com valores corretos', async () => {
        await salesController.getAllSales(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('se o response é uma array com valores correto', async () => {
        await salesController.getAllSales(req, res);
        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

});

describe('teste para a função de pegar uma venda pelo id na controller', () => {

    const req = {};
    const res = {};
    const next = () => {};

    beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns()
        req.params = { id: 1 };
  
        sinon.stub(salesServices, 'getIdSales').resolves([validObjectModules]);    
    });

    afterEach(() => {
      salesServices.getIdSales.restore();
    });

    it('se o response é um status 200 com valores corretos', async () => {
        await salesController.getIdSales(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('se o response é uma array com valores correto', async () => {
        await salesController.getAllSales(req, res, next);
        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

});