console.clear();
const express = require("express");
const app = express();
require("colors");
require("dotenv").config({ path: "backend/config.env" });
const connectDB = require("./scripts/connectDB");
const setStatic = require("./scripts/setStatic")
const getProdDetails = require("./scripts/getProdDetails");
const [PORT, isInProduction] = getProdDetails(8000);
const todosRoute = require("./routes/todosRoute")
const usersRoute = require("./routes/usersRoute");
const delay = require("./middlewares/delay");

app.use(express.json()) //ready to recive json data
app.use(delay(isInProduction ? 0 : 0.5))

app.use("/api/todos", todosRoute)
app.use("/api/users", usersRoute)

setStatic(app, express)

app.listen(PORT, () => {
  console.log("Server Started On Port:".cyan.bold.underline + " " + PORT);
  connectDB();
});
