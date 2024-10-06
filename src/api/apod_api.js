const API_KEY = 'api_key'; // Replace 'api_key' with your own API key
const NASA_API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

export const fetchAPOD = async (date = '') => {
    const url = date ? `${NASA_API_URL}&date=${date}` : NASA_API_URL;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
};