import { APOD_START_DATE, DEFAULT_LOCALE_OPTIONS } from '../constants/config';

/**
 * Get today's date in ISO format (YYYY-MM-DD)
 * @returns {string} ISO date string
 */
export const getISOToday = () => {
    return new Date().toISOString().slice(0, 10);
};

/**
 * Get yesterday's date in ISO format (YYYY-MM-DD)
 * @returns {string} ISO date string
 */
export const getISOYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().slice(0, 10);
};

/**
 * Generate a random date between APOD start date and today
 * @returns {string} Random ISO date string
 */
export const generateRandomDate = () => {
    const start = new Date(APOD_START_DATE).getTime();
    const end = Date.now();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime).toISOString().slice(0, 10);
};

/**
 * Format an ISO date string for display
 * @param {string} isoDate - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date string
 */
export const formatDisplayDate = (isoDate) => {
    try {
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat(undefined, DEFAULT_LOCALE_OPTIONS).format(date);
    } catch {
        return isoDate;
    }
};