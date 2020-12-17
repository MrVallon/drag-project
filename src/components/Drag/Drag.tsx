import React, { useState } from 'react';
import { MainLogo } from '../MainLogo/MainLogo';

import './Drag.scss';

interface DragTypes {
    imageSrc: string;
    getSrc: (event: React.ChangeEvent<HTMLInputElement>) => void;
    getDragSrc: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Drag: React.FC<DragTypes> = ({ imageSrc, getSrc, getDragSrc }) => {
    const [isActive, setIsActive] = useState(false);
    // const classes = ['drag'];
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

    return (
        <div
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={event => getDragSrc(event)}
            className={isActive ? 'drag enter' : 'drag'}
        >
            {imageSrc ? (
                <img
                    style={{ width: '80px', borderRadius: '80px' }}
                    srcSet={imageSrc}
                    alt="your logo"
                />
            ) : (
                <MainLogo />
            )}
            <p>Drag & drop here</p>
            <p>- or -</p>
            <input
                id="inputFile"
                type="file"
                accept=".jpeg, .png"
                onChange={event => getSrc(event)}
            />
            <label className="drag__upload" htmlFor="inputFile">
                Select file to upload
            </label>
        </div>
    );
};

export default Drag;
