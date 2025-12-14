import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks';
import { submitTranscription, submitAzureTranscription } from '../features/transcription/transcriptionSlice';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';

export const Home: React.FC = () => {
    const [url, setUrl] = useState('');
    const [source, setSource] = useState<'mock' | 'azure'>('mock');
    const [language, setLanguage] = useState('en-US');
    const dispatch = useAppDispatch();
    const { current, loading, error }: any = useAppSelector((state) => state.transcription);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        if (source === 'mock') {
            await dispatch(submitTranscription(url));
        } else {
            await dispatch(submitAzureTranscription({ audioUrl: url, language }));
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">New Transcription</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    label="Audio URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/audio.mp3"
                    required
                />

                <div className="flex gap-4 p-2 bg-gray-50 rounded-md">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="source"
                            value="mock"
                            checked={source === 'mock'}
                            onChange={() => setSource('mock')}
                        />
                        <span className="text-sm font-medium">Mock Service</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="source"
                            value="azure"
                            checked={source === 'azure'}
                            onChange={() => setSource('azure')}
                        />
                        <span className="text-sm font-medium">Azure Speech</span>
                    </label>
                </div>

                {source === 'azure' && (
                    <InputField
                        label="Language Code"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        placeholder="en-US"
                    />
                )}

                {error && <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>}

                <Button type="submit" isLoading={loading} disabled={!url || loading}>
                    Start Transcription
                </Button>
            </form>

            {current && (
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-md animate-fade-in">
                    <h3 className="font-semibold text-green-800 mb-2">Transcription Complete!</h3>
                    <p className="text-xs text-green-600 mb-2">ID: {current._id}</p>
                    <div className="p-3 bg-white rounded border border-green-100 text-gray-800">
                        {current.transcription}
                    </div>
                </div>
            )}
        </div>
    );
};
