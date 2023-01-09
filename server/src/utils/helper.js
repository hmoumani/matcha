function getIdParam(req) {
  const { id } = req.params;
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10);
  }
  throw new TypeError(`Invalid ':id' param: "${id}"`);
}

const ControllerResponse = (statusCode, message) => {
  return {
    statusCode,
    body: {
      message: message,
    },
  };
};

export default { getIdParam, ControllerResponse };
