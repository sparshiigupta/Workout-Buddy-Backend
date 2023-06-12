require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();
//middleware
//if we are sending some data to the server, then it parses it and attaches it to the request object
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  //to move to next peice of middleware
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
