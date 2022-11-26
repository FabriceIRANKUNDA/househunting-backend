import Response from "./helpers/Response";
import express from "express";
import bodyParser from "body-parser";
import HttpStatus from "http-status";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import xss from "xss-clean";
import compression from "compression";
import globalErrorHandler from "./helpers/utils/errorController";
import houseRouter from "./routes/houseRoutes";
import userRouter from "./routes/userRoutes";
import httpStatus from "http-status";
dotenv.config({ path: "./config.env" });

const app = express();

// Data sanitization against XSS(Cross-sites-scripting attacks)
app.use(xss());

// Compress all our response to the client
app.use(compression());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.text({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));

app.get("/", (req, res) => {
  res.json({ status: httpStatus.OK, message: "thank you for your request" });
});
app.use("/api/v1/houses", houseRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) =>
  Response.successMessage(res, "House hunting APIs", "", HttpStatus.OK)
);

app.use(globalErrorHandler);
app.use("*", (req, res) =>
  Response.errorMessage(
    res,
    "Oops, this route does not exist",
    HttpStatus.NOT_FOUND
  )
);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connected successfully!"));

const port = process.env.PORT || 9090;

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}...`);
});

export default app;
