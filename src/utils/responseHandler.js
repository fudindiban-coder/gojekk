const sendResponse = (res, statusCode, success, message, data = null) => {
  res.status(statusCode).json({
    success,
    message,
    ...(data && { data }),
  });
};

const sendSuccess = (res, message, data, statusCode = 200) => {
  sendResponse(res, statusCode, true, message, data);
};

const sendError = (res, message, statusCode = 500) => {
  sendResponse(res, statusCode, false, message);
};

module.exports = { sendResponse, sendSuccess, sendError };
