import React from 'react';
import { useAPOD } from './hooks/useAPOD';
import { CSS_CLASSES } from './constants/config';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import MediaDisplay from './components/MediaDisplay';
import ContentDisplay from './components/ContentDisplay';
import DateNavigator from './components/DateNavigator';

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