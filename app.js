const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const productsRouter = require("./routes/api/products");
const dailyNutritionsRouter = require("./routes/api/dailyNutritions");
const dailyIntakeRouter = require("./routes/api/dailyIntakeRoutes");
const developersRouter = require("./routes/api/developers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// const corsOptions = {
//   origin: "http://localhost:3000/registration",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

app.use(logger(formatsLogger));

// const whitelist = ["https://editor.swagger.io/" /*, "http://example.com" */];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// app.use(express.static("swagger-documentation"));

app.use("/api/users", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/dailynutritions", dailyNutritionsRouter);
app.use("/api/swagger", express.static("swagger-documentation"));
app.use("/api/developers", developersRouter);

app.use("/public", express.static("public"));

app.use("/api/daily-intake", dailyIntakeRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
