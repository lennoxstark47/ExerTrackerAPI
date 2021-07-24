const express = require('express');
const Router = express.Router();
const Exercise = require('../models/exercise.model');

Router.route('/').get((req, res) => {
	Exercise.find()
		.then((response) => res.json(response))
		.catch((err) =>
			res.status(400).json('Error:' + err)
		);
});

Router.route('/add').post((req, res) => {
	const { username, description } = req.body;
	const duration = Number(req.body.duration);
	const date = Date.parse(req.body.date);

	const newExercise = new Exercise({
		username,
		description,
		duration,
		date,
	});

	newExercise
		.save()
		.then((response) => res.json(response))
		.catch((err) =>
			res.status(400).json('Error:' + err)
		);
});

Router.route('/:id').get((req, res) => {
	Exercise.findById(req.params.id)
		.then((response) => res.json(response))
		.catch((err) =>
			res.status(400).json('Error:' + err)
		);
});

Router.route('/:id').delete((req, res) => {
	Exercise.findByIdAndDelete(req.params.id)
		.then((response) =>
			res.json('Successfully Deleted!')
		)
		.catch((err) =>
			res.status(400).json('Error:' + err)
		);
});

Router.route('/update/:id').post((req, res) => {
	Exercise.findById(req.params.id)
		.then((response) => {
			response.username = req.body.username;
			response.description = req.body.description;
			response.duration = Number(req.body.duration);
			response.date = Date.parse(req.body.date);

			response
				.save()
				.then((response) =>
					res.json('Successfully Updated!!!')
				)
				.catch((err) =>
					res.status(400).json('Error:' + err)
				);
		})
		.catch((err) =>
			res.status(400).json('Error:' + err)
		);
});

module.exports = Router;
