/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// Error handling Middleware function for logging the error message
const errorLogger = (error, request, response, next) => {
	console.log(`error: ${error.message}`);
	next(error); // calling next middleware
};

// Error handling Middleware function reads the error message
// and sends back a response in JSON format
const errorResponder = (error, request, response, next) => {
	response.header('Content-Type', 'application/json');
	const status = error.status || 400;
	response.status(status).json({
		status: status,
		message: error.message || 'something went wrong',
	});
};

// Fallback Middleware function for returning
// 404 error for undefined paths
const invalidPathHandler = (request, response, next) => {
	response.status(404);
	response.send('invalid path');
};

module.exports = { errorLogger, errorResponder, invalidPathHandler };
