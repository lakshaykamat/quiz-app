import express from 'express';
import dotenv from 'dotenv';
import proxyRoutes from './routes/proxy.routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/', proxyRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Gateway API running on port http://127.0.0.1:${PORT}/`);
});
