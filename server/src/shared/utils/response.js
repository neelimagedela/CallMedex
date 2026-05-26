const successResponse = ({
    res,
    status = 200,
    message,
    data = null
}) => {
    return res.status(status).json({
        success : true,
        message,
        data
    });
};

module.exports = {
    successResponse
};
