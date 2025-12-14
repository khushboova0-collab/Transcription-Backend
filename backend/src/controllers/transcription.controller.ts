import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import * as transcriptionService from '../services/transcription.service';

export const createTranscription = asyncHandler(async (req: Request, res: Response) => {
    const { audioUrl } = req.body;
    if (!audioUrl) {
        res.status(400);
        throw new Error('audioUrl is required');
    }

    const result = await transcriptionService.createTranscription(audioUrl, 'mock');
    res.status(201).json(result);
});

export const createAzureTranscription = asyncHandler(async (req: Request, res: Response) => {
    const { audioUrl, language } = req.body;
    if (!audioUrl) {
        res.status(400);
        throw new Error('audioUrl is required');
    }

    const result = await transcriptionService.createTranscription(audioUrl, 'azure', language);
    res.status(201).json(result);
});

export const getTranscriptions = asyncHandler(async (req: Request, res: Response) => {
    const results = await transcriptionService.getRecentTranscriptions();
    res.status(200).json(results);
});
