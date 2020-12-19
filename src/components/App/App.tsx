import React, { useState } from 'react';
import Drag from '../Drag/Drag';
import './App.scss';

const App: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string>('');
    const [imageName, setImageName] = useState<string>('');

    const showWorningAlert = (message: string) => alert(message);

    const getSrc = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            const img = event.target.files[0];
            setImageName(img.name);
            validateUniqueImage(img);
        }
    };

    const getDragSrc = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files !== null) {
            if (event.dataTransfer.files.length > 1) {
                showWorningAlert('You can upload only one image');
            } else {
                const img = event.dataTransfer.files[0];
                setImageName(img.name);
                validateUniqueImage(img);
            }
        }
    };

    const validateUniqueImage = (img: File) => {
        if (imageName === img.name) {
            showWorningAlert('This is same picture');
        } else {
            validateFileType(img);
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

    const validateImageSize = (image: HTMLImageElement) => {
        if (image.complete && image.naturalWidth > 0) {
            if (image.width === 100 && image.height === 100) {
                setImageSrc(image.src);
            } else {
                showWorningAlert('Logo should be square and 100px size');
                setImageSrc(prev => prev);
            }
        } else {
            setTimeout(() => validateImageSize(image), 100);
        }
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
