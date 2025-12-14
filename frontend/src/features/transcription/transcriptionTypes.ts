export interface Transcription {
    _id: string;
    audioUrl: string;
    transcription: string;
    source: 'mock' | 'azure';
    createdAt: string;
}

export interface TranscriptionState {
    list: Transcription[];
    current: Transcription | null;
    loading: boolean;
    error: string | null;
}
