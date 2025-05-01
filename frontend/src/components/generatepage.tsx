import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const AvatarGenerator: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const generateAvatar = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'avatar' }),
            });
            
            const blob = await response.blob();
            setImage(URL.createObjectURL(blob));
        } catch (error) {
            console.error('Error generating avatar:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-xl font-bold mb-2">Please wait a minutes...</h2>
                <p className="text-gray-600 mb-4">We are generating your profile avatar</p>
                
                <div className="border p-4 rounded-lg bg-gray-50 mb-4">
                    {image ? <img src={image} alt="Avatar" className="w-full rounded-md" /> : <div className="h-40 bg-gray-200"></div>}
                </div>
                
                <div className="flex justify-between">
                    <button onClick={() => navigate(-7)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Edit</button>
                    <button onClick={generateAvatar} disabled={loading} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                        {loading ? 'ReGenerating...' : 'Re-generate'}
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Accept</button>
                </div>
            </div>
        </div>
    );
};

export default AvatarGenerator;