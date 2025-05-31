import express from "express";
import routes from "./routes/submission.routes";
import cors from "cors";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/health", (req: any, res: any) =>
  res.send("Submission service is working")
);
app.use("/", routes);

app.listen(process.env.SUBMISSION_SERVICE_PORT || 4004, () =>
  console.log(
    "Submission Service running on port http://localhost:" +
      process.env.SUBMISSION_SERVICE_PORT || 4004
  )
);
export default app;
