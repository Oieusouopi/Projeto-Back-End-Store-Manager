const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const salesServices = require('../../../services/salesServices');
const salesController = require('../../../controllers/salesController');
const { arrayMockSalesModules } = require('../../helpers/mockSales');


describe('teste para a função de pegar todas as vendas na controller', () => {

    const req = {};
    const res = {};

    beforeEach(() => {
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