import React from 'react';
import { CSS_CLASSES } from '../constants/config';

const MediaDisplay = ({ data }) => {
    if (!data) return null;

    return (
        <div className="apod-media-container">
            {data.media_type === 'video' ? (
                <iframe
                    className={CSS_CLASSES.APOD_IMAGE}
                    src={data.url}
                    title={data.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            ) : (
                <img
                    className={CSS_CLASSES.APOD_IMAGE}
                    src={data.url}
                    alt={data.title}
                    loading="lazy"
                />
            )}
        </div>
    );
};

export default MediaDisplay;