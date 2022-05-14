const { describe, it } = require('mocha');
const { expect } = require('chai');

const productsModels = require('../../../models/productsModels');

// HELPERS
const { objectMockModules } = require('../../helpers/mockProducts');

// RESTOREDB
const restoreDb = require('../../restoreDb');

describe('teste para a função de pegar todos produtos', () => {

  beforeEach(async() => {
    await restoreDb();
  })

  it('É uma array', async () => {
    const products = await productsModels.getAllProducts();
    expect(products).to.be.an('array');
  });
  it('Tem a propriedade id', async () => {
    const [products] = await productsModels.getAllProducts();
    expect(products).to.have.property('id');
  });

  it('Tem a propriedade name', async () => {
    const [products] = await productsModels.getAllProducts();
    expect(products).to.have.property('name');
  });

  it('Tem a propriedade quantity', async () => {
    const [products] = await productsModels.getAllProducts();
    expect(products).to.have.property('quantity');
  });

});

describe('teste para a função de pegar o id do produto', () => {

  beforeEach(async () => {
    await restoreDb();
    });

  it('É uma array', async () => {
    const { SUCESSPRODUCTID } = objectMockModules;
    const productsId = await productsModels.getIdProducts(SUCESSPRODUCTID);
    expect(productsId).to.be.an('array');
  });

  it('é um objeto com as propriedades corretas', async () => {
    const { SUCESSPRODUCTID, NAMEMOCK, QUANTITYMOCK } = objectMockModules;
    const [productsId] = await productsModels.getIdProducts(SUCESSPRODUCTID);
    const { id, name, quantity } = productsId;
    expect(id).to.equal(SUCESSPRODUCTID);
    expect(name).to.equal(NAMEMOCK);
    expect(quantity).to.equal(QUANTITYMOCK);
  });

  it('Com id inexistente retorna vazio', async () => {
    const { INVALIDPRODUCTID } = objectMockModules;
    const [productsId] = await productsModels.getIdProducts(INVALIDPRODUCTID);
    expect(productsId).to.be.an('undefined');
  });
});

describe('teste para a função de pegar o produto pelo name', () => {

 it('É uma array', async () => {
   const { NAMEMOCK } = objectMockModules;
   const product = await productsModels.getNameProduct(NAMEMOCK);
   expect(product).to.be.an('array');
 });

 it('tem a proprieda id', async () => {
  const { NAMEMOCK } = objectMockModules;
  const [product] = await productsModels.getNameProduct(NAMEMOCK);
  expect(product).to.be.property('id');
 })

 it('tem a propriedade name', async () => {
  const { NAMEMOCK } = objectMockModules;
  const [product] = await productsModels.getNameProduct(NAMEMOCK);
  expect(product).to.be.property('name');
 });

 it('tem a propriedade quantity', async () => {
  const { NAMEMOCK } = objectMockModules;
  const [product] = await productsModels.getNameProduct(NAMEMOCK);
  expect(product).to.be.property('quantity');
 });

 it('com o name incorreto retorna vazio', async () => {
  const { INVALIDNAME } = objectMockModules;
  const [product] = await productsModels.getNameProduct(INVALIDNAME);
  expect(product).to.be.an('undefined');
 });

});

describe('teste da função de inserir um produto a lista', () => {

  it('retorna true', async () => {
    const { NAMEMOCK, QUANTITYMOCK } = objectMockModules;
    const funcReturn = await productsModels.postProducts(NAMEMOCK, QUANTITYMOCK);
    expect(funcReturn).to.be.true;
  });

});

describe('teste da função de alterar um produto ja cadastrado', () => {

  it('retorna true', async () => {
    const { SUCESSPRODUCTID, NAMEMOCK, QUANTITYMOCK } = objectMockModules;
    const productPut = await productsModels.putProducts(SUCESSPRODUCTID, NAMEMOCK, QUANTITYMOCK);
    expect(productPut).to.be.true;
  });

});

describe('teste da função de deletar um produto', () => {

  it('retorna true', async () => {
    const { SUCESSPRODUCTID } = objectMockModules;
    const productDelete = await productsModels.deleteProducts(SUCESSPRODUCTID);
    expect(productDelete).to.be.true;
  });

});