const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const db = require('./keys').MongoURI;
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
// const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

// app.use(
// 	express.static(
// 		path.resolve(__dirname, './client/build')
// 	)
// );

// app.get('*', (request, response) => {
// 	response.sendFile(
// 		path.resolve(
// 			__dirname,
// 			'./client/build',
// 			'index.html'
// 		)
// 	);
// });

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
	console.log(
		'MongoDB database connection established successfully'
	);
});

// mongoose
// 	.connect(db, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useCreateIndex: true,
// 	})
// 	.then((response) =>
// 		console.log('MongoDb connected.....')
// 	)
// 	.catch((err) => console.log(err));

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
	console.log(`App is running on port ${port}`);
});
