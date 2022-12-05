export default (controller) => async (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
    };
    const httpResponse = await controller(httpRequest);
    return res.status(httpResponse.statusCode).send(httpResponse.body);
};  