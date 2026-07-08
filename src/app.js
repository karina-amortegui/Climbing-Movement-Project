const express = require("express");

// ----------- MOCK DB --------------------------- START
const adminCreds = {
  username: "admin",
  password: "123456s*",
};

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

  res.send({
    message: "login successful",
  });
});

// 3. module.exports = app;
// app.listen(8787, function () {
//   console.log("Server is running on port 8787");
// });
module.exports = app;
