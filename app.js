const express = require("express");
require("dotenv").config();

const authentificationRoutes = require("./routes/authentificationRouter.js");

const app = express();
app.use(express.json());

app.use(authentificationRoutes);

const port = process.env.APP_PORT || 8080;

app.listen(port, ()=>{
  console.log(`Server is running on PORT ${port}.`);
});