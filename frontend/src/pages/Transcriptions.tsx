import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks';
import { fetchTranscriptions } from '../features/transcription/transcriptionSlice';
import { Loader } from '../components/Loader';

export const Transcriptions: React.FC = () => {
    const dispatch = useAppDispatch();
    const { list, loading }: any = useAppSelector((state) => state.transcription);

    useEffect(() => {
        dispatch(fetchTranscriptions());
    }, [dispatch]);

    if (loading && list.length === 0) return <Loader />;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Recent Transcriptions</h1>
            <div className="grid gap-4">
                {list.map((item: any) => (
                    <div key={item._id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.source === 'azure' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                {item.source.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="font-mono text-xs text-gray-400 mb-2 truncate" title={item.audioUrl}>{item.audioUrl}</p>
                        <p className="text-gray-800 bg-gray-50 p-3 rounded-md text-sm">{item.transcription}</p>
                    </div>
                ))}
                {list.length === 0 && !loading && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 ml-2">No transcriptions found within last 30 days.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
