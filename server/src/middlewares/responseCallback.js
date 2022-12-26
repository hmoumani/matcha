export default (controller) => async (req, res) => {
    const httpResponse = await controller(req, res);
    return res.status(httpResponse.statusCode).send(httpResponse.body);
};  