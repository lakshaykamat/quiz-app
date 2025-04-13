import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/auth.routes';
import bodyParserErrorHandler from 'express-body-parser-error-handler';
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();

const app = express();

// Middleware: Body Parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Routes
// Health check route
//@ts-ignore
app.get('/health', (req: Request, res: Response) => res.send('Auth Service is running'));
app.use('/api/v1/auth', routes);

// Error Handling Middleware
// app.use(bodyParserErrorHandler());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI_AUTH_SERVICE!)
  .then(() => {
    console.log('MongoDB connected - Auth Service');
    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () =>
      console.log(`Auth Service running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the database connection fails
  });
