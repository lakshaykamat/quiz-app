import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes';
import { startUserRegisteredConsumer } from './events/consumers/userConsumer';
import { connectQueue } from './events/connection';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/notify', emailRoutes);

// Health Check Route
app.get('/health', (req: any, res: any) => res.send('Notification Service running 🚀'));

app.get('/', (req: any, res: any) => res.send('Notification Service running 🚀'));

// Function to start the service
const start = async () => {
  try {
    console.log('Starting Notification Service...');

    // Connect to the queue
    await connectQueue();
    console.log('Queue connected - Notification Service');

    // Start the consumer
    await startUserRegisteredConsumer();
    console.log('User Registered Consumer started');

    // Start the server
    const PORT = process.env.PORT || 4002;
    app.listen(PORT, () => {
      console.log(`Notification Service running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error starting Notification Service:', err);
    process.exit(1); // Exit the process if any critical error occurs
  }
};

// Start the service
start();
