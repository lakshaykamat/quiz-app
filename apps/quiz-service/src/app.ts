import express from "express";
import mongoose from "mongoose";
import quizRoutes from "./routes/quiz.routes";
import dotenv from "dotenv";

dotenv.config();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Quiz routes
  app.use("/", quizRoutes);

  mongoose.connect(process.env.MONGO_URI_QUIZ_SERVICE!).then(() => {
    console.log("MONGO_URI_QUIZ_SERVICE connected");
    app.listen(process.env.PORT || 4002, () =>
      console.log("Quiz Microservices running on port http://localhost:4002")
    );
  });
