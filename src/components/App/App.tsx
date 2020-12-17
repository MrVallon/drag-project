import React, { useState } from 'react';
import Drag from '../Drag/Drag';

import './App.scss';

const App: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string>('');

    const getSrc = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            const img = event.target.files[0];
            validateFileType(img);
        }
    };

    const getDragSrc = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files !== null) {
            const img = event.dataTransfer.files[0];
            validateFileType(img);
        }
    };

    const validateImageSize = (image: HTMLImageElement) => {
        if (image.complete && image.naturalWidth > 0) {
            if (image.width === 100 && image.height === 100) {
                console.log('Correct file!');
                setImageSrc(image.src);
            } else {
                setImageSrc('warning');
                console.log('Not correct file!');
            }
        } else {
            setTimeout(() => validateImageSize(image), 100);
        }
    };

    const validateFileType = (file: File) => {
        const validTypes = ['image/jpeg', 'image/png'];
        const imgUrl = URL.createObjectURL(file);
        const image = document.createElement('img');
        image.src = imgUrl;

        if (validTypes.includes(file.type)) {
            return validateImageSize(image);
        }

        return false;
    };

    return (
        <div className="app">
            <div className="app__header">
                <h1 className="app__heading">Company Logo</h1>
                <p className="app__conditions">
                    Logo should be square, 100px size and in png, jpeg file
                    format.
                </p>
            </div>
            <div className="app__main-field">
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
