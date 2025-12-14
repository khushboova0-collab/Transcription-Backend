import mongoose from 'mongoose';
import { logger } from '../utils/logger.util';

export const connectDB = async (): Promise<void> => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        const conn = await mongoose.connect(mongoUri);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${(error as Error).message}`);
        process.exit(1);
    }
};
