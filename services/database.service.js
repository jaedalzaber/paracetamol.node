
const RESOLVER = require('awilix').RESOLVER;
const Lifetime = require('awilix').Lifetime;
const InjectionMode = require('awilix').InjectionMode;

// const User = requires("../api/collections/users/user.model.js");

class DatabaseService {
	constructor() {
		this.User = require("../api/collections/users/user.model.js");
	}

	getData(){
		console.log('injected');
	}
}
// // `RESOLVER` is a Symbol.
// DatabaseService[RESOLVER] = {
// 	name: 'db',
// 	lifetime: Lifetime.SINGLETON,
// 	injectionMode: InjectionMode.CLASSIC
// }

module.exports = DatabaseService;

