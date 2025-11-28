import React from 'react';
import { useAPOD } from './hooks/useAPOD.js';
import { CSS_CLASSES } from './constants/config.js';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ErrorDisplay from './components/ErrorDisplay.jsx';
import MediaDisplay from './components/MediaDisplay.jsx';
import ContentDisplay from './components/ContentDisplay.jsx';
import DateNavigator from './components/DateNavigator.jsx';

const APOD = () => {
    const {
        data,
        selectedDate,
        loading,
        error,
        showAll,
        isoToday,
        truncatedText,
        shouldShowReadMore,
        handleDateChange,
        handleTodayClick,
        handleYesterdayClick,
        handleRandomClick,
        toggleShowAll,
        retryFetch
    } = useAPOD();

    // Loading state
    if (loading) {
        return <LoadingSpinner />;
    }

    // Error state
    if (error) {
        return <ErrorDisplay error={error} onRetry={retryFetch} />;
    }

    // Guard against missing data
    if (!data) {
        return null;
    }

    return (
        <>
            <article className={CSS_CLASSES.APOD_CARD}>
                <MediaDisplay data={data} />
                <ContentDisplay
                    data={data}
                    showAll={showAll}
                    truncatedText={truncatedText}
                    shouldShowReadMore={shouldShowReadMore}
                    onToggleShowAll={toggleShowAll}
                />
            </article>

            <DateNavigator
                selectedDate={selectedDate}
                maxDate={isoToday}
                onDateChange={handleDateChange}
                onTodayClick={handleTodayClick}
                onYesterdayClick={handleYesterdayClick}
                onRandomClick={handleRandomClick}
            />
        </>
    );
};

export default APOD;