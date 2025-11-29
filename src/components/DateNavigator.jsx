import React from 'react';
import { APOD_START_DATE, CSS_CLASSES } from '../constants/config';

const DateNavigator = ({
    selectedDate,
    maxDate,
    onDateChange,
    onTodayClick,
    onYesterdayClick,
    onRandomClick
}) => {
    return (
        <nav className={CSS_CLASSES.DATE_NAVIGATOR} role="navigation" aria-label="Date navigation">
            <header className="nav-header">
                <h4>Explore More</h4>
            </header>

            <div className="nav-controls">
                <div className="date-picker-group">
                    <label htmlFor="date-picker" className="sr-only">Select date</label>
                    <input
                        id="date-picker"
                        type="date"
                        value={selectedDate}
                        onChange={onDateChange}
                        aria-label="Select date to view astronomy picture"
                        min={APOD_START_DATE}
                        max={maxDate}
                    />
                </div>

                <div className="quick-nav" role="group" aria-label="Quick date selection">
                    <button
                        onClick={onTodayClick}
                        title="View today's image"
                        className="nav-btn"
                        type="button"
                    >
                        Today
                    </button>
                    <button
                        onClick={onYesterdayClick}
                        title="View yesterday's image"
                        className="nav-btn"
                        type="button"
                    >
                        Yesterday
                    </button>
                    <button
                        onClick={onRandomClick}
                        title="View random image"
                        className="nav-btn random"
                        type="button"
                    >
                        Random
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default DateNavigator;