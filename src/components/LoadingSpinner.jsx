import React from 'react';
import { CSS_CLASSES } from '../constants/config';

const LoadingSpinner = () => {
    return (
        <div className={CSS_CLASSES.APOD_CARD} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div
                className={CSS_CLASSES.SPINNER}
                aria-hidden="true"
                role="status"
                aria-label="Loading astronomy picture"
            ></div>
            <span className="sr-only">Loading today's astronomy picture...</span>
        </div>
    );
};

export default LoadingSpinner;