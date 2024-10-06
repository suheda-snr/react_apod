import React, { useEffect, useState } from 'react';
import { fetchAPOD } from './api/apod_api';

const APOD = () => {
    const [data, setData] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch data
    const fetchData = async (date = '') => {
        setLoading(true);
        try {
            const result = await fetchAPOD(date);
            setData(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Call the fetchData function without a date
    }, []);

    // Automatically fetch image when the selected date changes
    useEffect(() => {
        if (selectedDate) {
            fetchData(selectedDate);
        }
    }, [selectedDate]);

    const handleFetchByDate = () => {
        fetchData(selectedDate); // Call fetchData with the selected date
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.date}</p>
            <img src={data.url} alt={data.title} />
            <p>{data.explanation}</p>
            <h2>Get Astronomy Picture of the Day for a Specific Date</h2>
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
            />
        </div>
    );
};

export default APOD;