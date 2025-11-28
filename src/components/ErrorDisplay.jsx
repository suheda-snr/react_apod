import React from 'react';
import { CSS_CLASSES } from '../constants/config.js';

const ErrorDisplay = ({ error, onRetry }) => {
    return (
        <div className={CSS_CLASSES.ERROR_CONTAINER} role="alert" aria-live="polite">
            <h2>Unable to load astronomy picture</h2>
            <p>Error: {error.message}</p>
            <button onClick={onRetry} className="retry-btn" type="button">
                Try Again
            </button>
        </div>
    );
};

export default ErrorDisplay;