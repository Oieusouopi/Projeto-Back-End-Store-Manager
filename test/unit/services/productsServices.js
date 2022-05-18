const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const productsModels = require('../../../models/productsModels');
const productsServices = require('../../../services/ProductsServices')

// HELPERS
const { objectMockModules, newProductObject, arrayMockModules, objectEqualOnSQL, newProductObjectByName } = require('../../helpers/mockProducts');
const restoreDb = require('../../restoreDb');

describe('teste da função de pegar todos produtos na service', () => {
  beforeEach(() => {
    sinon.stub(productsModels, 'getAllProducts').resolves(arrayMockModules);
  });

  afterEach(() => {
    productsModels.getAllProducts.restore();
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

describe('testado a função de pegar um produto por id na service', () => {

  beforeEach(() => {
    sinon.stub(productsServices, 'getIdProducts').resolves(objectEqualOnSQL);
  });

  afterEach(() => {
    productsServices.getIdProducts.restore();
  });

  it('se o retorno é uma array', async () => {
    const { SUCESSPRODUCTID } = objectMockModules[0];
    const productId = await productsServices.getIdProducts(SUCESSPRODUCTID);
    expect(productId).to.be.an('array');
  })

  it('se tem a propriedade id', async () => {
    const { SUCESSPRODUCTID } = objectMockModules[0];
    const [productId] = await productsServices.getIdProducts(SUCESSPRODUCTID);
    expect(productId).to.have.property('id');
  })

  it('se tem a propriedade name', async () => {
    const { SUCESSPRODUCTID } = objectMockModules[0];
    const [productId] = await productsServices.getIdProducts(SUCESSPRODUCTID);
    expect(productId).to.have.property('name');
  })

  it('se tem a propriedade quantity', async () => {
    const { SUCESSPRODUCTID } = objectMockModules[0];
    const [productId] = await productsServices.getIdProducts(SUCESSPRODUCTID);
    expect(productId).to.have.property('quantity');
  })

});

// describe.only('testando a função de adicionar um produto na service', () => {

//   beforeEach(async () => {
//     // const objectMock = {
//     //   id: 4,
//     //   name: "Martelo",
//     //   quantity: 5
//     // };
//     sinon.stub(productsModels, 'postProducts').resolves(true)
//     // sinon.stub(productsModels, 'getNameProduct').resolves(newProductObjectByName);
//   });

//   afterEach(async () => {
//     productsModels.postProducts.restore();
//     // productsModels.getNameProduct.restore();
//   });

//   it('quando tem os paramêtros corretos retorna um objeto', async () => {
//     const { NAMEMOCK, QUANTITYMOCK } = newProductObject;
//     await productsServices.postProducts(NAMEMOCK, QUANTITYMOCK);
//     const product = await productsModels.getNameProduct(NAMEMOCK);
//     expect(product).to.be.an('object');
//   });

//   it('se tem a propriedade id',async () => {
//     const { NAMEMOCK, QUANTITYMOCK } = newProductObject;
//     const product = await productsServices.postProducts(NAMEMOCK, QUANTITYMOCK);
//     expect(product).to.have.property('id');
//   })
  
//   it('se tem a propriedade name',async () => {
//     const { NAMEMOCK, QUANTITYMOCK } = newProductObject;
//     const product = await productsServices.postProducts(NAMEMOCK, QUANTITYMOCK);
//     expect(product).to.have.property('name');
//   })

//   it('se tem a propriedade quantity',async () => {
//     const { NAMEMOCK, QUANTITYMOCK } = newProductObject;
//     const product = await productsServices.postProducts(NAMEMOCK, QUANTITYMOCK);
//     expect(product).to.have.property('quantity');
//   })

//   it('se com name existente ela retorna uma mensagem',async () => {
//     const { QUANTITYMOCK } = newProductObject;
//     const { NAMEMOCK } = objectMockModules[0];
//     const product = await productsServices.postProducts(NAMEMOCK, QUANTITYMOCK);
//     expect(product).to.be.equal('Product already exists');
//   })

// });

describe('testando a função de alterar um produto na service com os componentes certos', () => {

  beforeEach(async () => {
    await restoreDb();
    sinon.stub(productsModels, 'putProducts').resolves(true)
  });

  afterEach(() => {
    productsModels.putProducts.restore();
  });

  it('se o retorno é um objeto', async () => {
    const { id, name, quantity } = objectEqualOnSQL[0];
    const products = await productsServices.putProducts(id, name, quantity);
    expect(products).to.be.an('object');
  });

  it('se tem a propriedade id',async () => {
    const { id, name, quantity } = objectEqualOnSQL[0];
    const products = await productsServices.putProducts(id, name, quantity);
    expect(products).to.have.property('id');
  })

  it('se tem a propriedade name',async () => {
    const { id, name, quantity } = objectEqualOnSQL[0];
    const products = await productsServices.putProducts(id, name, quantity);
    expect(products).to.have.property('name');
  })

  it('se tem a propriedade quantity',async () => {
    const { id, name, quantity } = objectEqualOnSQL[0];
    const products = await productsServices.putProducts(id, name, quantity);
    expect(products).to.have.property('quantity');
  })

});

describe('testando a função de deletar na service', () => {

  beforeEach(() => {
    sinon.stub(productsModels, 'deleteProducts').resolves(true);
  });

  afterEach(() => {
    productsModels.deleteProducts.restore();
  });

  it('deletando o produto o retorno é true',async () => {
    const { id } = objectEqualOnSQL[0];
    const deleteProduct = await productsServices.deleteProducts(id);
    expect(deleteProduct).to.be.true;
  });

});