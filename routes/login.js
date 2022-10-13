const express = require("express"),
  router = express.Router(),
  loginModel = require("../models/userModel"),
  bcrypt = require("bcrypt");
(jwt = require("jsonwebtoken")), (config = require("config"));

router.post("/users/login", async (req, res) => {
  try {
    let user = await loginModel.findOne({ Email: req.body.Email }).exec();
    console.log(user);
    if (!user) res.status(400).send("Invalid Email");

    let password = await bcrypt.compare(req.body.Password, user.Password); // compare(Plain Password , hashed password)
    if (!password) res.status(400).send("Invalid Email of Password");
    if (!config.get("jwtsec")) return res.status(500).send("bad Request");

    // const token = loginModel.generateToken;
    // console.log(token)
    const token = jwt.sign(
      { id: user._id, admin: user.isAdmin },
      config.get("jwtsec")
    );
    res.header("1st-token", token);
    // console.log(`token is ${token}`)
    // res.json(token)
    res.status(200).send("logged in..");
  } catch (err) {
    for (e in err.errors) console.log(`Errors ${err.errors[e].message}`);
  }
});

module.exports = router;
