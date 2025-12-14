import Transcription from '../models/transcription.model';
import { ITranscription } from '../interfaces/transcription.interface';
import { transcribeAudioAzure } from './azure.service';

export const mockTranscriptionService = async (audioUrl: string): Promise<string> => {
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 500));
    return `[Mock Transcription] Content of ${audioUrl}: This is a mock transcription result.`;
}

export const createTranscription = async (
    audioUrl: string,
    source: 'mock' | 'azure',
    language?: string
): Promise<ITranscription> => {
    let transcriptionText = '';

    if (source === 'azure') {
        transcriptionText = await transcribeAudioAzure(audioUrl, language);
    } else {
        transcriptionText = await mockTranscriptionService(audioUrl);
    }

    const newRecord = new Transcription({
        audioUrl,
        transcription: transcriptionText,
        source,
    });

    return await newRecord.save();
};

export const getRecentTranscriptions = async (): Promise<ITranscription[]> => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return await Transcription.find({
        createdAt: { $gte: thirtyDaysAgo },
    }).sort({ createdAt: -1 });
};
