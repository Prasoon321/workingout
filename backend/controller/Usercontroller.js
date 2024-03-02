const User = require("../models/usermodel")
const jwt = require('jsonwebtoken')

const createtoken = async (_id) => {

    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}
const loginuser = async (req, res) => {
    //     console.log('login user');
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password)
        const token = await createtoken(user._id)

        res.status(200).json({ token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }


}

const signupuser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password)
        const token = await createtoken(user._id)

        res.status(200).json({ token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
module.exports = {
    signupuser,
    loginuser
}