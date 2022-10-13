const user = require("../models/userModel");

let createStudents = async (req, res) => {
  let std = await user.findOne({ email: req.body.email }).exec();
  if (std) {
    return res.status(400).send("the user already registerd");
  }
  std = new user({
    name: req.body.name,
    stdId: req.body.stdId,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    done: req.body.done,
  });
  await std.save();
};

// getAll students
let getAllStudents = async (req, res) => {
  let std = await user.find(req);
  console.log(std);
};
// getById
let getStudentsById = async (req, res) => {
  let std = await user.findOne({ stdId: req.body.stdId }).exec();
  console.log(std);
  if (!std || !std.done) res.send("لم يتم اداء التربية العسكرية");
  else res.send("تم اداء التربية العسكرية");
  //   console.log(std);
};

//update for admins

let updateStudent = async (req, res) => {
  let std = await user.findOneAndUpdate(req.body.id, req.body, {
    returnOriginal: false,
  });
};
module.exports = {
  createStudents,
  getAllStudents,
  getStudentsById,
  updateStudent,
};
