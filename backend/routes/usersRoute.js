const express = require("express");
const User = require("../models/User")
const router = express.Router()
const { isEmail } = require("validator")
const {genSaltSync, hashSync, compareSync} = require("bcrypt")
const createAuthResObject = require("../scripts/createAuthResObject")

router.post("/register", async (req, res) => {
    try {
        if (!isEmail(req.body.email)) throw new Error("Invalid Email")
        const count = await User.count({ email : req.body.email })
        if(count) throw new Error("Email is not uniqe")
        const user = new User(req.body)
        if (user.password.length <5) throw new Error("Password too short")
        user.password = hashSync(user.password, genSaltSync(+process.env.SALT_ROUNDS))
        await user.save()
        res.status(201).send(createAuthResObject(user))
    } catch ({ message }) {res.status(400).send({ message })}
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if(!user) throw new Error("No user found")
        const passwordIsValid = compareSync(req.body.password, user.password)
        if(!passwordIsValid) throw new Error("Password is incorrect")
        res.send(createAuthResObject(user))
    } catch ({ message }) {res.status(404).send({ message })}
})

module.exports = router
