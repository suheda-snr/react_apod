const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const NASA_API_BASE_URL = 'https://api.nasa.gov/planetary/apod';
const REQUEST_TIMEOUT = 10000;

/**
 * Fetches Astronomy Picture of the Day data from NASA's API
 * @param {string} date - Optional date in YYYY-MM-DD format
 * @returns {Promise<Object>} APOD data object
 * @throws {Error} When the request fails or times out
 */
export const fetchAPOD = async (date = '') => {
    // Validate API key at runtime
    if (!API_KEY) {
        throw new Error(
            'NASA API key is required. Please set VITE_NASA_API_KEY in your .env file. ' +
            'Get a free API key from https://api.nasa.gov/'
        );
    }

    const params = new URLSearchParams({
        api_key: API_KEY,
        ...(date && { date })
    });

    const url = `${NASA_API_BASE_URL}?${params}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
            }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.error?.message ||
                `HTTP ${response.status}: ${response.statusText}`
            );
        }

        const data = await response.json();

        // Validate required fields
        if (!data.url || !data.title) {
            throw new Error('Invalid response: missing required fields');
        }

        return data;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
};