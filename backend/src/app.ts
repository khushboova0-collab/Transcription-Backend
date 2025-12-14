import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import transcriptionRoutes from './routes/transcription.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

// Connect to Database
connectDB();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', transcriptionRoutes);

// Basic Health Check
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handler
app.use(errorHandler);

export default app;
