class UserController {
	constructor({db}) {
		this.db = db;

		this.print = this.get.bind(this);
	}

	get (req, res) {
		this.db.User.find({})
			.then((users) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				// format result as json
				res.json(users);
			}, (err) => next(err))
			.catch((err) => next(err));
	}
}

module.exports = UserController;
