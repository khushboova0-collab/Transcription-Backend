import { Document } from 'mongoose';

export interface ITranscription extends Document {
    audioUrl: string;
    transcription: string;
    source: 'mock' | 'azure';
    createdAt: Date;
}
