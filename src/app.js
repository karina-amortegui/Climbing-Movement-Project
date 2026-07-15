const express = require("express");

// ----------- MOCK DB --------------------------- START
const adminCreds = {
  username: "admin",
  password: "123456s*",
};

const movements = [];
const MovementModel = (name, difficulty, description, extraNotes) => ({
  _id: movements.length + 1,
  name,
  difficulty,
  description,
  extraNotes: extraNotes || "",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null
})

const exercises = [];
const ExerciseModel = (name, movementId, difficulty, description, extraNotes) => ({})

// ----------- MOCK DB---------------------------- END

// 1. create instance of express
const app = express();

// middlewares
app.use(express.static("public"));
app.use(express.json());

// 2. add ping endpoint
app.get("/ping", function (req, res) {
  console.log("req =", req.ip);
  res.send("pong");
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (username !== adminCreds.username || password !== adminCreds.password) {
    return res.status(401).send({
      message: "invalid credentials",
    });
  }

  res.redirect("/")
});

app.post("/movements", function (req, res) {
  const { name, difficulty, description, extraNotes} = req.body;

  const newMovement = MovementModel(name, difficulty, description, extraNotes);
  movements.push(newMovement);

  res.status(201).json({
    message: "movement created successfully",
    data: newMovement
  })
})

app.get("/movements", function(req, res) {
  res.status(200).json({
    message: "movements fetched successfully",
    data: movements,
    total: movements.length
  })
})

// 3. module.exports = app;
// app.listen(8787, function () {
//   console.log("Server is running on port 8787");
// });
module.exports = app;
