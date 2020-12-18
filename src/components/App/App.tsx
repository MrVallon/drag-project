import React, { useState } from 'react';
import Drag from '../Drag/Drag';

import './App.scss';

const App: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const showWorningAlert = (message: string) => alert(message);

    const getSrc = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            const img = event.target.files[0];
            validateFileType(img);
        }
    };

    const getDragSrc = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsLoading(false);
        if (event.dataTransfer.files !== null) {
            if (event.dataTransfer.files.length > 1) {
                showWorningAlert('You can upload only one image');
            } else {
                const img = event.dataTransfer.files[0];
                validateFileType(img);
            }
        }
    };

    const validateImageSize = (image: HTMLImageElement) => {
        if (image.complete && image.naturalWidth > 0) {
            if (image.width === 100 && image.height === 100) {
                setImageSrc(image.src);
                setIsLoading(true);
            } else {
                showWorningAlert('Logo should be square and 100px size');
                setImageSrc(prev => prev);
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

        const currentFormatFile = file.type.split('/')[1];

        if (validTypes.includes(file.type)) {
            return validateImageSize(image);
        }

        return showWorningAlert(
            `Not correct file type "${currentFormatFile}"! Logo should be png or jpeg file format.`,
        );
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
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default App;
