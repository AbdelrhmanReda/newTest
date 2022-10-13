const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts")
const users = require("./routes/users")

// const ejs = require("ejs")
const port = 4000;
var bodyParser = require('body-parser')
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: true }))

app.use(expressLayout) ;
app.set("view engine" , "ejs")
app.use("/" ,require("./routes/index") )
app.use("/users",users)
// app.use("/users/login",require("./routes/login"))

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}...`);
});
