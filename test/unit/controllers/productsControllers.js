const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/ProductsServices');
const productsController = require('../../../controllers/ProductsController');

const { arrayMockModules, objectEqualOnSQL, newProductObjectByName } = require('../../helpers/mockProducts');
const restoreDb = require('../../restoreDb');

describe('teste da função de pegar todos produtos na controller', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()

      sinon.stub(productsService, 'getAllProducts').resolves(arrayMockModules);
    });

    afterEach(() => {
      productsService.getAllProducts.restore();
    });

    it('se o response é um status 200 com valores corretos',async () => {
      await productsController.getAllProducts(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('É retornado o método json contendo um array', async () => {
        await productsController.getAllProducts(req, res);
        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
  
    });

});

describe('teste da função de pegar um produto pelo id na controller', () => {

    const req = {};
    const res = {};
    const next = () => {};

    beforeEach(async () => {
      await restoreDb()
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { id: 1 };

      sinon.stub(productsService, 'getIdProducts').resolves(objectEqualOnSQL);

    });

    afterEach(() => {
      productsService.getIdProducts.restore();
    });

    it('se o response é um status 200 com valores corretos', async () => {
       await productsController.getIdProducts(req, res, next);
       expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('É retornado o método json contendo uma array', async () => {
        await productsController.getAllProducts(req, res, next);
        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
  
    });

});

describe('testando a função de adicionar um produto na controller', () => {

    const req = {};
    const res = {};
    const next = () => {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = {
        name: "Martelo",
        quantity: 5
      };

      sinon.stub(productsService, 'postProducts').resolves([newProductObjectByName]);

    });

    afterEach(() => {
        productsService.postProducts.restore();
    });

    it('se retorna um resolve com status 201', async () => {
        await productsController.postProducts(req, res, next);
        expect(res.status.calledWith(201)).to.be.equal(true);
    });

    it('é retornado um json com uma array contendo o produto criado', async () => {
        await productsController.postProducts(req, res, next);
        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
      });

});