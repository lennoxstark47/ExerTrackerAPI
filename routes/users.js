const express = require('express');
const Router = express.Router();
const User = require('../models/user.model');

Router.route('/').get((req, res) => {
	User.find()
		.then((response) => res.json(response))
		.catch((err) =>
			res.status(400).json('Error:' + err)
		);
});

Router.route('/add').post((req, res) => {
	const username = req.body.username;

	const newUser = new User({ username });

	newUser
		.save()
		.then((response) => res.json(response))
		.catch((err) =>
			res.status(400).json('Error:' + err)
		);
});

module.exports = Router;
