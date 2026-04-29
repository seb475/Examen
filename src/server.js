const mongoose = require('mongoose');
const connectDB = require('./utils/dbConnection');
const app = require('./app');
const startWorker = require('./workers/movimientoWorker');

connectDB();

mongoose.connection.once('open', () => {
		console.log("Connected to MongoDB");
})

mongoose.connection.on('error', err => {
		console.error(err);
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

	startWorker();
})