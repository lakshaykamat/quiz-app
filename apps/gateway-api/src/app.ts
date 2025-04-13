import express from 'express';
import dotenv from 'dotenv';
import proxyRoutes from './routes/proxy.routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

dotenv.config();
const app = express();

// Middleware: CORS
app.use(cors());

// Middleware: Logging
app.use(morgan('dev'));

// Middleware: Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Gateway API!');
});

// Proxy Routes
app.use('/', proxyRoutes);

// Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

// Start the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Gateway API running on http://127.0.0.1:${PORT}/`);
});
