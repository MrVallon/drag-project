import React, { useEffect, useState } from 'react';
import { MainLogo } from '../MainLogo/MainLogo';

import './Drag.scss';

interface DragTypes {
    imageSrc: string;
    getSrc: (event: React.ChangeEvent<HTMLInputElement>) => void;
    getDragSrc: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Drag: React.FC<DragTypes> = ({ imageSrc, getSrc, getDragSrc }) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isCancel, setIsCancel] = useState<boolean>(false);
    const [isUploadProcess, setIsUploadProcess] = useState<boolean>(false);
    const [dragText, setDragText] = useState<string>('Drag & drop here');
    const [uploadButtonText, setUploadButtonText] = useState<string>(
        'Select file to upload',
    );
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    const classes = isActive ? 'drag enter' : 'drag';

    const dragOver = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    const dragEnter = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsActive(!isActive);
    };

    const dragLeave = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsActive(!isActive);
    };

    const dragQuit = (event: React.DragEvent<HTMLDivElement>) => {
        getDragSrc(event);
        setIsActive(!isActive);
    };

    const delayUploadImage = (imageSrc: string) => {
        setDragText('Uploading');
        setUploadButtonText('Cancel');
        return new Promise(resolve => {
            setIsUploadProcess(true);
            setTimeout(() => {
                resolve(<img srcSet={imageSrc} alt="your logo" />);
                setIsUploadProcess(false);
            }, 1500);
        });
    };

    useEffect(() => {
        if (imageSrc) {
            delayUploadImage(imageSrc)
                .then((res: any) => setImage(res))
                .catch(() => setImage((prev: HTMLImageElement | null) => prev));
        }
    }, [imageSrc]);

    useEffect(() => {
        if (image) {
            setDragText('Drag & drop here to replace');
            setUploadButtonText('Select file to replace');
        } else {
            setDragText('Drag & drop here');
            setUploadButtonText('Select file to upload');
        }
    }, [image]);

    useEffect(() => {
        if (image && isCancel && !isUploadProcess) {
            setImage(null);
            setIsCancel(false);
        }
    }, [isCancel, image, isUploadProcess]);

    return (
        <div
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={event => dragQuit(event)}
            className={classes}
        >
            {isUploadProcess && (
                <div className="loading">
                    <svg>
                        <circle
                            className="dot__circ"
                            cx="40"
                            cy="40"
                            r="39.5"
                        />
                    </svg>
                </div>
            )}
            {image ? image : <MainLogo />}
            <p>{dragText}</p>
            <p className="drag__or">- or -</p>
            {uploadButtonText !== 'Cancel' ? (
                <React.Fragment>
                    <input
                        id="inputFile"
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={event => getSrc(event)}
                    />
                    <label className="drag__upload" htmlFor="inputFile">
                        {uploadButtonText}
                    </label>
                </React.Fragment>
            ) : (
                <div className="drag__cancel" onClick={() => setIsCancel(true)}>
                    {uploadButtonText}
                </div>
            )}
        </div>
    );
};

export default Drag;
