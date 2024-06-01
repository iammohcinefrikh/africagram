const express = require("express");
require("dotenv").config();

const authentificationRoutes = require("./routes/authentificationRouter.js");
const postRoutes = require("./routes/postRouter.js");
const followerRoutes = require("./routes/followerRouter.js");
const coumentRouter= require("./routes/commentRouter.js");
const userRouter= require("./routes/userRouter.js");
const statisticsRouter = require("./routes/statisticsRouter.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authentificationRoutes);
app.use(postRoutes);
app.use(followerRoutes);
app.use(coumentRouter);
app.use(userRouter);
app.use(statisticsRouter);

const port = process.env.APP_PORT || 8080;

app.listen(port, ()=>{
  console.log(`Server is running on PORT ${port}.`);
});