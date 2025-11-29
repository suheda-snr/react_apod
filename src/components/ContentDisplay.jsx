import React from 'react';
import { formatDisplayDate } from '../utils/dateUtils';
import { CSS_CLASSES } from '../constants/config';

const ContentDisplay = ({
    data,
    showAll,
    truncatedText,
    shouldShowReadMore,
    onToggleShowAll
}) => {
    if (!data) return null;

    return (
        <div className={CSS_CLASSES.APOD_CONTENT}>
            <header className="apod-meta">
                <h1>{data.title} <span aria-hidden="true">✨</span></h1>
                <div className="date-row">
                    <time className="date-badge" dateTime={data.date} title={data.date}>
                        <strong>{formatDisplayDate(data.date)}</strong>
                    </time>
                    <div className="credit">
                        {data.copyright ? `© ${data.copyright}` : 'Public Domain'}
                    </div>
                </div>
            </header>

            <div className="apod-description">
                <p className={`apod-explanation ${showAll ? 'expanded' : ''}`}>
                    {showAll ? data.explanation : truncatedText}
                </p>

                {shouldShowReadMore && (
                    <button
                        className="link-like"
                        onClick={onToggleShowAll}
                        aria-expanded={showAll}
                        aria-controls="apod-explanation"
                        type="button"
                    >
                        {showAll ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ContentDisplay;