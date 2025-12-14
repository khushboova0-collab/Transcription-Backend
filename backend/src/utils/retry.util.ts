import { logger } from './logger.util';

export const retryOperation = async <T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000
): Promise<T> => {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) {
            throw error;
        }
        logger.warn(`Operation failed, retrying in ${delay}ms... (${retries} retries left)`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return retryOperation(fn, retries - 1, delay * 2);
    }
};
