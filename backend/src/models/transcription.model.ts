import mongoose, { Schema } from 'mongoose';
import { ITranscription } from '../interfaces/transcription.interface';

const TranscriptionSchema: Schema = new Schema({
    audioUrl: { type: String, required: true },
    transcription: { type: String, required: true },
    source: { type: String, enum: ['mock', 'azure'], required: true },
    createdAt: { type: Date, default: Date.now, index: true },
});

// Index for date filtering
TranscriptionSchema.index({ createdAt: -1 });

export default mongoose.model<ITranscription>('Transcription', TranscriptionSchema);
