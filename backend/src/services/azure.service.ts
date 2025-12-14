import { logger } from '../utils/logger.util';
import { retryOperation } from '../utils/retry.util';

// Mock Azure SDK integration
export const transcribeAudioAzure = async (audioUrl: string, language: string = 'en-US'): Promise<string> => {
    return retryOperation(async () => {
        logger.info(`Starting Azure transcription for ${audioUrl} in ${language}`);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate random failure for retry testing (10% chance)
        if (Math.random() < 0.1) {
            throw new Error('Simulated Azure API failure');
        }

        return `[Azure Transcription] Content of ${audioUrl} (${language}): The quick brown fox jumps over the lazy dog.`;
    });
};
