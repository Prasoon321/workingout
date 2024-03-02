const express = require("express")
const router = express.Router();
const registerauth = require("../middleware/requireauth")
const {
    createworkout,
    getallworkout,
    getsingleworkout,
    upadateworkout,
    deleteworkout
} = require("../controller/workoutcontroller")
// authenticate before using that 

router.use(registerauth);
// get all workout
router.get('/', getallworkout)
// get single workout
router.get('/:id', getsingleworkout);
// add new workout
router.post('/', createworkout);
router.delete('/:id', deleteworkout);
router.patch('/:id', upadateworkout);
module.exports = router;