const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bycryt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bycryt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json({ msg: "User created" });
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
  try {
    if (!user) {
      res.statusCode = 404;
      return res.json();
    }
    const validPassword = await bycryt.compare(password, user.password);
    if (!validPassword) {
      res.statusCode = 401;
      return res.json();
    }
    const accessToken = jwt.sign(
      { username: user.username, id: user.id },
      "importantSecret"
    );

    res.json({ token: accessToken, message: "Login Successful" });
  } catch (err) {
    res.send(err);
  }
});

router.get("/userAuth", validateToken, (req, res) => {
  res.json(req.user.username);
});

module.exports = router;
