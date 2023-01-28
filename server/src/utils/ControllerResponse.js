const ControllerResponse = (statusCode, message) => {
    return {
        statusCode,
        body: {
    		message: message,
        },
    };
};

export default ControllerResponse;