const express = require("express");
const router = express.Router();
// const model = require("../models/userModel")
const controller = require("../controllers/userController");

const loginModel = require("../models/userModel"),
  bcrypt = require("bcrypt");
(jwt = require("jsonwebtoken")), (config = require("config"));

router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/getstudent", (req, res) => {
  res.render("getStudent");
});
router.get("/addNew", (req, res) => {
  res.render("addNew");
});
router.get("/toggle", (req, res) => {
  res.render("changeState");
});
router.post("/toggle", async (req,res)=>{
  let user = await loginModel.findOne({ stdId: req.body.stdId }).exec();
  console.log(user.done)
  if(!user.done) user.done= true ; 
  console.log(user.done)

})

router.post("/register", controller.createStudents);
router.post("/getstudent", controller.getStudentsById);

//login handler
router.post("/login", async (req, res) => {
  try {
    let user = await loginModel.findOne({ email: req.body.email }).exec();
    console.log(user);
    if (!user || user.isAdmin === false) res.status(400).send("Invalid Email");
    // let password = await bcrypt.compare(req.body.password, user.password); // compare(Plain Password , hashed password)
    if (!req.body.password || req.body.password != user.password)
      res.status(400).send("Invalid Email of Password");
    // if (!config.get("jwtsec")) return res.status(500).send("bad Request");

    // const token = jwt.sign({ id: user._id }, config.get("jwtsec"));
    // res.header("1st-token", token);
    res.status(200).render("dashboard");
  } catch (err) {
    for (e in err.errors) console.log(`Errors ${err.errors[e].message}`);
  }
});

module.exports = router;
