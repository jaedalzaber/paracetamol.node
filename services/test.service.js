const RESOLVER = require('awilix').RESOLVER;
const Lifetime = require('awilix').Lifetime;
const InjectionMode = require('awilix').InjectionMode;

class Test {
	constructor({db}) {
		this.db = db;

		this.print = this.print.bind(this);
	}

	print(){
		this.db.getData();
	}
}

// Test[RESOLVER] = {
// 	name: 'test',
// 	lifetime: Lifetime.SINGLETON,
// 	injectionMode: InjectionMode.CLASSIC
// }


module.exports = Test;
