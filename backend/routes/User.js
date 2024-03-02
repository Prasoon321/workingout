const express = require('express')
const router = express.Router();
const { signupuser, loginuser } = require("../controller/Usercontroller")
// login route
router.post('/login', loginuser)

router.post('/signup', signupuser)
module.exports = router