const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require('jsonwebtoken')
const schema = mongoose.Schema;
const userschema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })
// static signup method 
userschema.statics.signup = async function (email, password) {
    const exists = await this.findOne({ email })
    if (!email || !password) {
        throw Error("Please fill all the fields")
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid Email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
    if (exists) {
        throw Error('User already exists')
    }
    // generate the salt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    try {
        const user = await this.create({ email, password: hash });
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
    }
}
userschema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("Please fill all the fields")
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('incorect email')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect Password')
    }
    return user;
}
module.exports = mongoose.model('User', userschema)