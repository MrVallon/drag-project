import React, { useState } from 'react';
import { MainLogo } from '../MainLogo/MainLogo';

import './Drag.scss';

interface DragTypes {
    imageSrc: string;
    isLoading: boolean;
    getSrc: (event: React.ChangeEvent<HTMLInputElement>) => void;
    getDragSrc: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Drag: React.FC<DragTypes> = ({
    imageSrc,
    getSrc,
    getDragSrc,
    isLoading,
}) => {
    const [isActive, setIsActive] = useState(false);
    const classes = isActive ? 'drag enter' : 'drag';
    const isWarning = imageSrc === 'warning';

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

    return (
        <div
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={event => dragQuit(event)}
            className={classes}
        >
            {isLoading && (
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
            {imageSrc && !isWarning ? (
                <img srcSet={imageSrc} alt="your logo" />
            ) : (
                <MainLogo />
            )}

            <p>Drag & drop here</p>
            <p>- or -</p>
            <input
                id="inputFile"
                type="file"
                accept="image/jpeg,image/png"
                onChange={event => getSrc(event)}
            />
            <label className="drag__upload" htmlFor="inputFile">
                Select file to upload
            </label>
        </div>
    );
};

export default Drag;
