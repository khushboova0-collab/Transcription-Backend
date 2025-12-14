import { Router } from 'express';
import * as transcriptionController from '../controllers/transcription.controller';

const router = Router();

router.post('/transcription', transcriptionController.createTranscription);
router.get('/transcriptions', transcriptionController.getTranscriptions);
router.post('/azure-transcription', transcriptionController.createAzureTranscription);

export default router;
