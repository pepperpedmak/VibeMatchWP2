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
        <div>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
            />
            <button onClick={generateImage} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Image'}
            </button>
            {image && <img src={image} alt="Generated" style={{ maxWidth: '500px' }} />}
        </div>
    );
};

export default ImageGenerator;