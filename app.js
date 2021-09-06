const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require('./routes');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api", routes());

app.listen(5000, function () {
  console.log('App run in port 5000!');
});