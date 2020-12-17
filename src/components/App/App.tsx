import React, { useState } from 'react';
import Drag from '../Drag/Drag';

import './App.scss';

const App: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string>('');

    const getSrc = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            const img = event.target.files[0];
            validateFile(img);
        }
    };

    const getDragSrc = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files !== null) {
            const img = event.dataTransfer.files[0];
            validateFile(img);
        }
    };

    const validateFile = (file: File) => {
        const validTypes = ['image/jpeg', 'image/png'];
        if (validTypes.includes(file.type)) {
            return setImageSrc(URL.createObjectURL(file));
        }
        return false;
    };

    return (
        <div className="app">
            <header>
                <h1>Company Logo</h1>
                <p>
                    Logo should be square, 100px size and in png, jpeg file
                    format.
                </p>
            </header>
            <div className="app__main">
                <Drag
                    imageSrc={imageSrc}
                    getSrc={getSrc}
                    getDragSrc={getDragSrc}
                />
            </div>
        </div>
    );
};

export default App;
