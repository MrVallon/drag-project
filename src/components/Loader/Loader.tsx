import React from 'react';
import './Loader.scss';

const Loader = () => (
    <div className="loading">
        <svg>
            <circle className="dot__circ" cx="40" cy="40" r="39.5" />
        </svg>
    </div>
);

export default Loader;
