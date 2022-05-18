const objectMockModules = [{
	SUCESSPRODUCTID: 1,
	NAMEMOCK: "Martelo de Thor",
	QUANTITYMOCK: 10,
}];

const objectEqualOnSQL = [{
	id: 1,
	name: "Martelo de Thor",
	quantity: 10,
}];

const invalidObjectModules = {
	INVALIDPRODUCTID: 10,
	INVALIDNAME:"Martelo",
}

const arrayMockModules = [
	{
		id: 1,
		name: "Martelo de Thor",
		quantity: 10
	},
	{
		id: 2,
		name: "Traje de encolhimento",
		quantity: 20
	},
	{
		id: 3,
		name: "Escudo do Capitão América",
		quantity: 30
	}
];

const newProductObject = {
	NAMEMOCK: "Martelo",
	QUANTITYMOCK: 10,
};

const newProductObjectByName = [{
	id: 5,
	name: "Martelo",
	quantity: 10,
}];


module.exports = {
	objectMockModules,
	newProductObject,
	arrayMockModules,
	invalidObjectModules,
	objectEqualOnSQL,
	newProductObjectByName,
};