import dotenv from 'dotenv';
import path from 'path'
const envPath = path.resolve(__dirname, '../.env');
console.log('Loading env from:', envPath);
dotenv.config({ path: envPath });
import express from 'express';
import QuizService from './services/quiz-service/src/app';
import SubmissionService from './services/submission-service/src/app';
import NotificationService from './services/notification-service/src/app'
import AuthService from './services/auth-service/src/app'
import Gateway from "./services/gateway-api/src/app"
import mongoose from 'mongoose';

const app = express();
app.use('/quiz', QuizService);
app.use('/submission', SubmissionService);
app.use('/notification', NotificationService);
app.use('/auth', AuthService);
app.use('/', Gateway);
//@ts-ignore
app.get('/', (_req, res) => res.send("Welcome"))

app.use("/static", express.static(path.join(__dirname, "public")));
app.listen(process.env.PORT || 3000, () => {
  mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log("MONGO_URI connected - Backend");
    console.log('Backend running on port', process.env.PORT || 3000);
  }).catch(err => {  
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if connection fails
  });
});
