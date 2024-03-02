const workoutmodel = require('../models/workoutmodel')
const mongoose = require('mongoose')
//get all workout
const getallworkout = async (req, res) => {
    const workouts = await workoutmodel.find({}).sort({ createdAt: -1 })
    return res.status(200).json(workouts)
}
//get single workout
const getsingleworkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json(404).json({ error: error.message })
    }
    const workout = await workoutmodel.findById(id)
    if (!workouts) {
        return res.status(404).json({ error: error.message })
    }
    res.status(200).json(workout)
}
//create a new  workout
const createworkout = async (req, res) => {
    const { title, reps, load } = req.body;
    let emptyfield = []
    if (!title) {
        emptyfield.push("title")
    }
    if (!load) {
        emptyfield.push("load")
    }
    if (!reps) {
        emptyfield.push("reps")
    }
    if (emptyfield.length > 0) {
        return res.status(400).json({ error: "Please fill out the following fields", emptyfield })
    }
    //adding doc to db
    try {
        const workout = await workoutmodel.create({ title, reps, load });
        return res.status(200).json(workout)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
//update existing workout
const upadateworkout = async () => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json(404).json({ error: error.message })
    }
    const updatedWorkout = await workoutmodel.findByIdAndUpdate({ _id: id }, { ...req.body })
    if (!workout) {
        return res.status(404).json({ error: error.message })
    }
    res.status(200).json(updatedWorkout)
}
//delete a workout 
const deleteworkout = async (req, res) => {
    const { id } = req.params;
    console.log("inside delete function")
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json(404).json({ error: "No such workouts" })
    }
    const workout = await workoutmodel.findOneAndDelete({ _id: id })
    if (!workout) {
        return res.status(400).json({ error: "No such workouts" });
    }
    res.status(200).json(workout);
}
//get single workout
//get single workout
module.exports = {
    createworkout,
    getallworkout,
    getsingleworkout,
    upadateworkout,
    deleteworkout
}