import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

beforeAll(async () => {
    // Ideally we wait for DB connection here, but app.ts initiates it.
    // We can pause slightly or check state.
    const waitForDB = async () => {
        if (mongoose.connection.readyState === 1) return;
        await new Promise(resolve => setTimeout(resolve, 500));
        await waitForDB();
    };
    await waitForDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Transcription API', () => {
    it('POST /api/transcription should create a mocked transcription', async () => {
        const res = await request(app)
            .post('/api/transcription')
            .send({ audioUrl: 'http://test.com/audio.mp3' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.source).toEqual('mock');
    });

    it('GET /api/transcriptions should return list', async () => {
        const res = await request(app).get('/api/transcriptions');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
