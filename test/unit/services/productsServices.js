const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

// const productsModels = require('../../../models/productsModels');
const productsServices = require('../../../services/ProductsServices')

// HELPERS
const { objectMockModules, newProductObject } = require('../../helpers/mockProducts');
const restoreDb = require('../../restoreDb');

describe('teste da função de pegar todos produtos', () => {
  beforeEach(async () => {
  await restoreDb();
//   sinon.stub(productsServices, 'getAllProducts').resolves()
  });

  it('se retorna uma array', async () => {
    const products = await productsServices.getAllProducts();
    expect(products).to.be.an('array');
  });

  it('se tem a propriedade id', async () => {
    const [products] = await productsServices.getAllProducts();
    expect(products).to.have.property('id');
  });

  it('se tem a proprieda name', async () => {
    const [products] = await productsServices.getAllProducts();
    expect(products).to.have.property('id');
  });

  it('se tem a propriedade quantity', async () => {
    const [products] = await productsServices.getAllProducts();
    expect(products).to.have.property('quantity');
  });
});

describe('testado a função de pegar um produto por id', () => {

  it('se o retorno é um objeto', async () => {
    const { SUCESSPRODUCTID } = objectMockModules;
    const productId = await productsServices.getIdProducts(SUCESSPRODUCTID);
    expect(productId).to.be.an('object');
  })

  it('se tem a propriedade id', async () => {
    const { SUCESSPRODUCTID } = objectMockModules;
    const productId = await productsServices.getIdProducts(SUCESSPRODUCTID);
    expect(productId).to.have.property('id');
  })

  it('se tem a propriedade name', async () => {
    const { SUCESSPRODUCTID } = objectMockModules;
    const productId = await productsServices.getIdProducts(SUCESSPRODUCTID);
    expect(productId).to.have.property('name');
  })

  it('se tem a propriedade quantity', async () => {
    const { SUCESSPRODUCTID } = objectMockModules;
    const productId = await productsServices.getIdProducts(SUCESSPRODUCTID);
    expect(productId).to.have.property('quantity');
  })

});

describe('testando a função de adicionar um produto', () => {

  beforeEach(async () => {
    await restoreDb();
  })

  it('quando tem os paramêtros corretos retorna um objeto', async () => {
    const { NAMEMOCK, QUANTITYMOCK } = newProductObject;
    const product = await productsServices.postProducts(NAMEMOCK, QUANTITYMOCK);
    expect(product).to.be.an('object');
  });

  it('se tem a propriedade id',async () => {
    const { NAMEMOCK, QUANTITYMOCK } = newProductObject;
    const product = await productsServices.postProducts(NAMEMOCK, QUANTITYMOCK);
    expect(product).to.have.property('id');
  })
  
  it('se tem a propriedade name',async () => {
    const { NAMEMOCK, QUANTITYMOCK } = newProductObject;
    const product = await productsServices.postProducts(NAMEMOCK, QUANTITYMOCK);
    expect(product).to.have.property('name');
  })

  it('se tem a propriedade quantity',async () => {
    const { NAMEMOCK, QUANTITYMOCK } = newProductObject;
    const product = await productsServices.postProducts(NAMEMOCK, QUANTITYMOCK);
    expect(product).to.have.property('quantity');
  })

  it.only('se com name existente ela retorna uma mensagem',async () => {
    const { QUANTITYMOCK } = newProductObject;
    const { NAMEMOCK } = objectMockModules;
    const product = await productsServices.postProducts(NAMEMOCK, QUANTITYMOCK);
    console.log(product);
    expect(product).to.deep.equal('Product already exists');
  })

});