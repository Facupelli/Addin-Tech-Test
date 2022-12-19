const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const routes = require("./routes/index");
require("dotenv").config();

const PORT = 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/addin_tech_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((e) => {
    console.log(e.message);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", routes);
