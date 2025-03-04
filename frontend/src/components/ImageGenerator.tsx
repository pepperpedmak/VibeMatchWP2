import React, { useState } from 'react';

const ImageGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const blob = await response.blob();
            setImage(URL.createObjectURL(blob));
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <h2 className='text-2xl font-bold mb-4'>Please wait a minutes...</h2>
            <p className='text-gray-700'>We are generating your profile avatar</p>
            {image && <img src={image} alt="Generated" style={{ maxWidth: '500px' }} />}
    
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
            />
            <button onClick={generateImage} disabled={loading}className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
                {loading ? 'Generating...' : 'Generate Image'}
            </button>
        </div>
    );
};

export default ImageGenerator;