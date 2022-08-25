const statusMessage = {
  200: "Success",
  201: "Created",
  400: "Invalid format",
  500: "Internal error",
};

const success = async function (req, res, data, typeResponse, status) {
  let response = {};

  if (!status) {
    status = 200;
  }

  if (!data) {
    data = [];
  }

  response = {
    status: statusMessage[status],
    error: "",
    data,
  };

  res.status(status).send(response);
};

const error = function (req, res, message, typeResponse, status, details) {
  let response = {};

  if (!status) {
    status = 500;
  }

  if (!message) {
    message = statusMessage[status];
  }

  response = {
    status: statusMessage[status],
    error: message,
    data: [],
  };
  console.error(`[Response Error] ${details}`);
  res.status(status).send(response);
};

module.exports = {
  success,
  error,
};
