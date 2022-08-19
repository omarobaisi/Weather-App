const express = require("express");
const path = require("path");
const api = require("./server/routes/api");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL||'mongodb://localhost/weatherApp');

app.use("/", api);

const port = 3000;
app.listen(process.env.PORT || PORT, function () {
  console.log(`Server running on ${port}`);
});
