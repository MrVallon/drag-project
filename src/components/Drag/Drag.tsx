import React, { useEffect, useState } from 'react';
import { MainLogo } from '../MainLogo/MainLogo';
import Loader from '../Loader/Loader';
import './Drag.scss';

interface TDragProps {
    imageSrc: string;
    handleFileOnButtonClick: (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => void;
    handleFileOnDrag: (event: React.DragEvent<HTMLDivElement>) => void;
    clearImageDataOnCancel: (isCancel: boolean) => void;
}

interface TInitialState {
    isActive: boolean;
    isUploadProcess: boolean;
    dragText: string;
    uploadButtonText: string;
    image: HTMLImageElement | null;
}

const Drag: React.FC<TDragProps> = ({
    imageSrc,
    handleFileOnButtonClick,
    handleFileOnDrag,
    clearImageDataOnCancel,
}) => {
    const [isCancel, setIsCancel] = useState<boolean>(false);
    const [state, setState] = useState<TInitialState>({
        isActive: false,
        isUploadProcess: false,
        dragText: 'Drag & drop here',
        uploadButtonText: 'Select file to upload',
        image: null,
    });

    const {
        isActive,
        image,
        uploadButtonText,
        dragText,
        isUploadProcess,
    } = state;

    const classes = isActive ? 'drag enter' : 'drag';

    const dragOver = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    const dragEnter = (event: React.MouseEvent) => {
        event.preventDefault();
        setState({
            ...state,
            isActive: !isActive,
        });
    };

    const dragLeave = (event: React.MouseEvent) => {
        event.preventDefault();
        setState({
            ...state,
            isActive: !isActive,
        });
    };

    const dragQuit = (event: React.DragEvent<HTMLDivElement>) => {
        handleFileOnDrag(event);
        setState({
            ...state,
            isActive: !isActive,
        });
    };

    const delayUploadImage = (imageSrc: string) => {
        return new Promise(resolve => {
            setState({
                ...state,
                dragText: 'Uploading',
                uploadButtonText: 'Cancel',
                isUploadProcess: true,
            });
            setTimeout(() => {
                resolve(<img srcSet={imageSrc} alt="your logo" />);
                setState({
                    ...state,
                    isUploadProcess: false,
                });
            }, 1500);
        });
    };

    useEffect(() => {
        if (imageSrc) {
            delayUploadImage(imageSrc)
                .then((res: any) => {
                    setState({ ...state, image: res });
                })
                .catch(() =>
                    setState(prevState => ({
                        ...state,
                        image: prevState.image,
                    })),
                );
        }
    }, [imageSrc]);

    useEffect(() => {
        if (image) {
            setState({
                ...state,
                dragText: 'Drag & drop here to replace',
                uploadButtonText: 'Select file to replace',
            });
        } else {
            setState({
                ...state,
                dragText: 'Drag & drop here',
                uploadButtonText: 'Select file to upload',
            });
        }
    }, [image]);

    useEffect(() => {
        if (image && isCancel && !isUploadProcess) {
            clearImageDataOnCancel(isCancel);
            setState({
                ...state,
                image: null,
            });
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
            {isUploadProcess && <Loader />}
            {image ? image : <MainLogo />}
            <p>{dragText}</p>
            <p className="drag__or">- or -</p>
            {uploadButtonText !== 'Cancel' ? (
                <React.Fragment>
                    <input
                        id="inputFile"
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={event => handleFileOnButtonClick(event)}
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
