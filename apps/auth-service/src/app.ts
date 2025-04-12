import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/auth.routes'

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', routes);

mongoose.connect(process.env.MONGO_URI_AUTH_SERVICE!).then(() => {
  console.log('MongoDB connected - Auth Service');
  app.listen(process.env.PORT || 4001, () =>
    console.log('Auth Service running on port http://localhost:4001')
  );
});
