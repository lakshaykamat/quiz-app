import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/submission.routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/", routes);

mongoose.connect(process.env.MONGO_URI_SUBMISSION_SERVICE!).then(() => {
  console.log("MONGO_URI_SUBMISSION_SERVICE connected - Submission Service");
  app.listen(process.env.PORT || 4003, () =>
    console.log("Submission Service running on port http://localhost:4003")
  );
});
