/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const errorLogger = (error, request, response, next) => {
	console.log(`error: ${error.message}`);
	next(error);
};

const errorResponder = (error, request, response, next) => {
	response.header('Content-Type', 'application/json');
	const status = error.status || 400;
	response.status(status).json({
		status: status,
		message: error.message || 'Something went wrong',
	});
};

const invalidPathHandler = (request, response, next) => {
	response.status(404);
	response.send('invalid path');
};

module.exports = { errorLogger, errorResponder, invalidPathHandler };
