module.exports = (error, req, res, next) => {
    return res.status(400).send("Something went wrong. This is from central error!!");
}