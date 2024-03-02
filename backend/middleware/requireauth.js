const jwt = require('jsonwebtoken')
const usermodel = require('../models/usermodel')
const requireauth = async (req, res, next) => {
    // verify authentication
    const { Authorization } = req.headers
    if (!Authorization) {
        return res.status(401).json({ error: "Authorization token required" })
    }
    const token = Authorization.split(' ')[1]
    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await usermodel.findOne({ _id }).select("_id")
        next();
    } catch (error) {
        res.status(401).json({ error: "Required valid token" })
    }
}
module.exports = requireauth