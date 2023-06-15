const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
//get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};
//get a workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

//create a workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  let emptyFields = [];
  let negFeilds = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "please fill in all the feilds", emptyFields, negFeilds });
  }
  if (load < 0) {
    negFeilds.push("load");
  }
  if (reps < 0) {
    negFeilds.push("reps");
  }
  if (negFeilds.length > 0) {
    return res.status(400).json({
      error: "please fill in positive values for the feilds",
      negFeilds,
      emptyFields,
    });
  }
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (Err) {
    res.status(400).json({ error: Err.message });
  }
};
//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findByIdAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  getWorkout,
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
