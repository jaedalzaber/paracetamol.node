const awilix = require('awilix')

const DatabaseService = require('./services/database.service');
const PolicyService = require('./services/policy.service');
const Test = require('./services/test.service');

const UserController = require('./api/collections/users/user.controller');
const UserService = require('./api/collections/users/user.service');
const UserPolicy = require('./api/collections/users/user.service');

const container = awilix.createContainer(
	{injectionMode: awilix.InjectionMode.PROXY}
);

function setup () {
	container.register({
		test: awilix.asClass(Test).scoped(),
		db: awilix.asClass(DatabaseService).singleton(),
		policyCtx: awilix.asClass(PolicyService).singleton(),

		userService: awilix.asClass(UserService).scoped(),

		userController: awilix.asClass(UserController).scoped(),


	});

	return container;
}

module.exports = setup;
