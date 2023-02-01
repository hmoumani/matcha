import HttpStatusCode from '../enums/HttpStatusCode';

export default (validator) => (req, res, next) => {
  const httpRequest = {
    body: req.body,
    query: req.query,
    params: req.params,
    userId: req.userId
  };
  const { error, value } = validator(httpRequest);
  if (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
      status: HttpStatusCode.BAD_REQUEST
    });
    return;
  }
  req.body = value;
  return next();
};
