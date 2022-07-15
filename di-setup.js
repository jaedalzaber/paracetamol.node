const awilix = require('awilix')

const DatabaseService = require('./services/database.service');
const Test = require('./services/test.service');

const UserController = require('./api/collections/users/user.controller');

const container = awilix.createContainer(
	{injectionMode: awilix.InjectionMode.PROXY}
);

function setup () {
	container.register({
		test: awilix.asClass(Test).scoped(),
		db: awilix.asClass(DatabaseService).singleton(),

		UserController: awilix.asClass(UserController).scoped(),
	});

	return container;
}

module.exports = setup;
