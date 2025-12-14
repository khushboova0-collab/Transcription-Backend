import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { type Transcription, type TranscriptionState } from './transcriptionTypes';
import axios from '../../api/axiosInstance';

const initialState: TranscriptionState = {
    list: [],
    current: null,
    loading: false,
    error: null,
};

export const fetchTranscriptions = createAsyncThunk(
    'transcription/fetchAll',
    async () => {
        const response = await axios.get('/transcriptions');
        return response.data;
    }
);

export const submitTranscription = createAsyncThunk(
    'transcription/submit',
    async (audioUrl: string) => {
        const response = await axios.post('/transcription', { audioUrl });
        response.data.audioUrl = audioUrl; // Ensure it's available for list update locally if needed, though backend returns it
        return response.data;
    }
);

export const submitAzureTranscription = createAsyncThunk(
    'transcription/submitAzure',
    async ({ audioUrl, language }: { audioUrl: string; language?: string }) => {
        const response = await axios.post('/azure-transcription', { audioUrl, language });
        return response.data;
    }
);

const transcriptionSlice = createSlice({
    name: 'transcription',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchTranscriptions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTranscriptions.fulfilled, (state, action: PayloadAction<Transcription[]>) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchTranscriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch transcriptions';
            })
            // Submit Mock
            .addCase(submitTranscription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitTranscription.fulfilled, (state, action: PayloadAction<Transcription>) => {
                state.loading = false;
                state.current = action.payload;
                state.list.unshift(action.payload);
            })
            .addCase(submitTranscription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to submit transcription';
            })
            // Submit Azure
            .addCase(submitAzureTranscription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitAzureTranscription.fulfilled, (state, action: PayloadAction<Transcription>) => {
                state.loading = false;
                state.current = action.payload;
                state.list.unshift(action.payload);
            })
            .addCase(submitAzureTranscription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to submit Azure transcription';
            });
    },
});

export default transcriptionSlice.reducer;
