const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = async function verifyToken(req, res, next) {
   try {
    const auth = req.headers.authorization
    const [name, token] = auth.trim().split(" ")
    if (name !== "Bearer") throw new Error("Must be a bearer token")
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findOne({ _id })
    next()
   } catch ({ message }) {res.status(403).send({ message })}
}