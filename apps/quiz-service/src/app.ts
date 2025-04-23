import express from "express";
import mongoose from "mongoose";
import quizRoutes from "./routes/quiz.routes";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/static",express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Quiz routes
app.use("/", quizRoutes);

mongoose.connect(process.env.MONGO_URI_QUIZ_SERVICE!).then(() => {
  console.log("MONGO_URI_QUIZ_SERVICE connected");
  app.listen(process.env.PORT || 4002, () =>
    console.log(`Quiz Microservices running on port http://localhost:${process.env.PORT}`)
  );
});
export default app