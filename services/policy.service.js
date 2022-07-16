const RESOLVER = require('awilix').RESOLVER;
const Lifetime = require('awilix').Lifetime;
const InjectionMode = require('awilix').InjectionMode;

const ROLE = require('./config/roles.js')

class PolicyService {
	constructor({db}) {
		this.db = db;

		this.print = this.print.bind(this);
	}

	print(){
		this.db.getData();
	}

	evaluate(condition) {

	}
}

// Test[RESOLVER] = {
// 	name: 'test',
// 	lifetime: Lifetime.SINGLETON,
// 	injectionMode: InjectionMode.CLASSIC
// }


module.exports = PolicyService;
