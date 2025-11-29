import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchAPOD } from '../api/apod_api';
import { TEXT_PREVIEW_LENGTH } from '../constants/config';
import { getISOToday, getISOYesterday, generateRandomDate } from '../utils/dateUtils';

/**
 * Custom hook for managing APOD data and state
 * @returns {Object} APOD state and handlers
 */
export const useAPOD = () => {
    const [data, setData] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);

    // Memoized date values
    const isoToday = useMemo(() => getISOToday(), []);
    const isoYesterday = useMemo(() => getISOYesterday(), []);

    // Fetch function
    const fetchData = useCallback(async (date = '') => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchAPOD(date);
            setData(result);
        } catch (fetchError) {
            console.error('Failed to fetch APOD data:', fetchError);
            setError(fetchError);
        } finally {
            setLoading(false);
        }
    }, []);

    // Effects
    useEffect(() => {
        fetchData(); // Initial load
    }, [fetchData]);

    useEffect(() => {
        if (selectedDate) {
            fetchData(selectedDate);
        }
    }, [selectedDate, fetchData]);

    // Event handlers
    const handleDateChange = useCallback((event) => {
        setSelectedDate(event.target.value);
    }, []);

    const handleTodayClick = useCallback(() => {
        setSelectedDate(isoToday);
    }, [isoToday]);

    const handleYesterdayClick = useCallback(() => {
        setSelectedDate(isoYesterday);
    }, [isoYesterday]);

    const handleRandomClick = useCallback(() => {
        setSelectedDate(generateRandomDate());
    }, []);

    const toggleShowAll = useCallback(() => {
        setShowAll(prev => !prev);
    }, []);

    const retryFetch = useCallback(() => {
        fetchData(selectedDate);
    }, [fetchData, selectedDate]);

    // Computed values
    const truncatedText = useMemo(() => {
        if (!data?.explanation) return '';
        return data.explanation.length > TEXT_PREVIEW_LENGTH
            ? data.explanation.slice(0, TEXT_PREVIEW_LENGTH) + '...'
            : data.explanation;
    }, [data?.explanation]);

    const shouldShowReadMore = useMemo(() => {
        return data?.explanation?.length > TEXT_PREVIEW_LENGTH;
    }, [data?.explanation]);

    return {
        // State
        data,
        selectedDate,
        loading,
        error,
        showAll,
        isoToday,

        // Computed values
        truncatedText,
        shouldShowReadMore,

        // Handlers
        handleDateChange,
        handleTodayClick,
        handleYesterdayClick,
        handleRandomClick,
        toggleShowAll,
        retryFetch
    };
};