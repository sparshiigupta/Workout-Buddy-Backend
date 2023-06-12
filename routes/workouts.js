const express = require("express");
const {
  getWorkout,
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const router = express.Router();

//get all workouts
router.get("/", getWorkouts);

//get a workout
router.get("/:id", getWorkout);

//update a workout
router.patch("/:id", updateWorkout);

//delete a workout
router.delete("/:id", deleteWorkout);

//post a workout
router.post("/", createWorkout);

module.exports = router;
