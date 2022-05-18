const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const productsModels = require('../../../models/productsModels');
const connection = require('../../../models/connection');

// HELPERS
const { objectMockModules, arrayMockModules, invalidObjectModules, objectEqualOnSQL } = require('../../helpers/mockProducts');

// RESTOREDB
// const restoreDb = require('../../restoreDb');

describe('teste para a função de pegar todos produtos na models', () => {

  beforeEach(async() => {
    sinon.stub(connection, 'execute').resolves(arrayMockModules);
  });

  afterEach(async () => {
    connection.execute.restore();
  });

  it('É um objeto', async () => {
    const products = await productsModels.getAllProducts();
    expect(products).to.be.an('object');
  });
  it('Tem a propriedade id', async () => {
    const products = await productsModels.getAllProducts();
    expect(products).to.have.property('id');
  });

  it('Tem a propriedade name', async () => {
    const products = await productsModels.getAllProducts();
    expect(products).to.have.property('name');
  });

  it('Tem a propriedade quantity', async () => {
    const products = await productsModels.getAllProducts();
    expect(products).to.have.property('quantity');
  });

});

describe('teste para a função de pegar o id do produto com o retorno correto na models', () => {

  beforeEach(() => {
    sinon.stub(connection, 'execute').resolves(objectEqualOnSQL)
    });

  afterEach(() => {
    connection.execute.restore();
  });

  it('É um objeto', async () => {
    const { SUCESSPRODUCTID } = objectMockModules;
    const productsId = await productsModels.getIdProducts(SUCESSPRODUCTID);
    expect(productsId).to.be.an('object');
  });

  it('é um objeto com as propriedades corretas', async () => {
    const { SUCESSPRODUCTID } = objectMockModules;
    const productsId = await productsModels.getIdProducts(SUCESSPRODUCTID);
    expect(productsId).to.have.property('id');
    expect(productsId).to.have.property('name');
    expect(productsId).to.have.property('quantity');
  });
});

describe('teste para a função de pegar o id do produto com o retorno incorreto na models', () => {

  beforeEach(async () => {
    const expectReturn = [];
    sinon.stub(connection, 'execute').resolves(expectReturn);
  });

  afterEach(async () => {
    connection.execute.restore();
  });

  it('Com id inexistente retorna vazio', async () => {
    const { INVALIDPRODUCTID } = invalidObjectModules;
    const productsId = await productsModels.getIdProducts(INVALIDPRODUCTID);
    expect(productsId).to.be.a('undefined');
  });

});

describe('teste para a função de pegar o produto pelo name com o name correto na models', () => {

  beforeEach(async () => {
    sinon.stub(connection, 'execute').resolves(objectEqualOnSQL);
  });

  afterEach(async () => {
    connection.execute.restore();
  });

 it('É um objeto', async () => {
   const { name } = objectEqualOnSQL;
   const product = await productsModels.getNameProduct(name);
   expect(product).to.be.an('object');
 });

 it('tem a proprieda id', async () => {
  const { name } = objectEqualOnSQL;
  const product = await productsModels.getNameProduct(name);
  expect(product).to.be.property('id');
 })

 it('tem a propriedade name', async () => {
  const { name } = objectEqualOnSQL;
  const product = await productsModels.getNameProduct(name);
  expect(product).to.be.property('name');
 });

 it('tem a propriedade quantity', async () => {
  const { name } = objectEqualOnSQL;
  const product = await productsModels.getNameProduct(name);
  expect(product).to.be.property('quantity');
 });

});


describe('teste para a função de pegar o produto pelo name com o name incorreto na models', () => {

  beforeEach(async () => {
    const expectReturn = [];
    sinon.stub(connection, 'execute').resolves(expectReturn);
  });

  afterEach(async () => {
    connection.execute.restore();
  });

  it('com o name incorreto retorna vazio', async () => {
    const { INVALIDNAME } = invalidObjectModules;
    const product = await productsModels.getNameProduct(INVALIDNAME);
    expect(product).to.be.an('undefined');
   });

});

describe('teste da função de inserir um produto a lista na models', () => {

  beforeEach(async () => {
    sinon.stub(connection, 'execute').resolves(true);
  });

  afterEach(async () => {
    connection.execute.restore();
  });

  it('retorna true', async () => {
    const { NAMEMOCK, QUANTITYMOCK } = objectMockModules;
    const funcReturn = await productsModels.postProducts(NAMEMOCK, QUANTITYMOCK);
    expect(funcReturn).to.be.true;
  });

});

describe('teste da função de alterar um produto ja cadastrado na models', () => {

  beforeEach(async () => {
    sinon.stub(connection, 'execute').resolves(true);
  });

  afterEach(async () => {
    connection.execute.restore();
  });

  it('retorna true', async () => {
    const { SUCESSPRODUCTID, NAMEMOCK, QUANTITYMOCK } = objectMockModules;
    const productPut = await productsModels.putProducts(SUCESSPRODUCTID, NAMEMOCK, QUANTITYMOCK);
    expect(productPut).to.be.true;
  });

});

describe('teste da função de deletar um produto na models', () => {

  beforeEach(async () => {
    sinon.stub(connection, 'execute').resolves(true);
  });

  afterEach(async () => {
    connection.execute.restore();
  });

  it('retorna true', async () => {
    const { SUCESSPRODUCTID } = objectMockModules;
    const productDelete = await productsModels.deleteProducts(SUCESSPRODUCTID);
    expect(productDelete).to.be.true;
  });

});