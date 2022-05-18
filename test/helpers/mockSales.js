const mockSales = {
    DATEMOCK: "2022-05-07T00:25:03.000Z",
    SUCESSSALESID: 1,
    SUCESSPRODUCTID: 1,
    QUANTITYMOCK: 5,
};

const invalidObjectModules = {
  INVALIDPRODUCTID:10,
};

const validObjectModules = [{
  date: "2022-05-07T00:25:03.000Z",
  saleId: 1,
  productId: 1,
  quantity: 5,
}];
  
const arrayMockSalesModules = [[
	{
		"saleId": 1,
		"date": "2022-05-17T17:35:14.000Z",
		"productId": 1,
		"quantity": 5
	},
	{
		"saleId": 1,
		"date": "2022-05-17T17:35:14.000Z",
		"productId": 2,
		"quantity": 10
	},
	{
		"saleId": 2,
		"date": "2022-05-17T17:35:14.000Z",
		"productId": 3,
		"quantity": 15
	}
],]

module.exports = {
  mockSales,
  arrayMockSalesModules,
  invalidObjectModules,
  validObjectModules,
};