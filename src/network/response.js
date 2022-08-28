const statusMessage = {
  200: "Success",
  201: "Created",
  400: "Invalid format",
  500: "Internal error",
};

const success = async (req, res, data, typeResponse, status) => {
  let response = {};

  response = {
    status: statusMessage[status] || [],
    error: "",
    data: data || [],
  };

  res.status(status).send(response);
};

const error = (req, res, message, typeResponse, status, details) => {
  let response = {};

  response = {
    status: statusMessage[status] || statusMessage[500],
    error: message || statusMessage[status],
    data: [],
  };
  console.error(`[Response Error] ${details}`);
  res.status(status).send(response);
};

module.exports = {
  success,
  error,
};
