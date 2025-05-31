import express from "express";
import quizRoutes from "./routes/quiz.routes";
import path from "path";

const app = express();

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Quiz routes
app.use("/", quizRoutes);
app.listen(process.env.QUIZ_SERVICE_PORT || 4002, () =>
  console.log(
    `Quiz Microservices running on port http://localhost:${process.env.QUIZ_SERVICE_PORT}`
  )
);
export default app;
