import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/auth.routes';
import bodyParserErrorHandler from 'express-body-parser-error-handler';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectQueue } from './events/connection';

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
app.get('/health', (req: any, res: any) => res.send('Auth Service is running'));
app.use('/api/v1/auth', routes);

// Error Handling Middleware
// app.use(bodyParserErrorHandler());

// Function to start the service
async function startService() {
  try {
    console.log('Starting Auth Service...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI_AUTH_SERVICE!);
    console.log('MongoDB connected - Auth Service');

    // Connect to the queue
    await connectQueue();
    console.log('Queue connected - Auth Service');

    // Start the server
    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => {
      console.log(`Auth Service running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error starting Auth Service:', err);
    process.exit(1); // Exit the process if any critical error occurs
  }
}

// Start the service
startService();