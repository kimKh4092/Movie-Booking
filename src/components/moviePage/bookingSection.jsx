import React from 'react';

const BookingSection = (props) => {

    const getTime = () => {
        const movieDates = props.movieDates;
        const index = props.dateIndex;

        const times = Object.keys(movieDates[index].takenSeats);
        let sorted = [];
        let temp = 0;
        for (let i = 0; i < times.length; i++) {
            if (i === 0) {
                temp = times[i];
            } else {
                if (i === times.length - 1) {
                    sorted.push(times[i]);
                    sorted.push(temp);
                } else {
                    sorted.push(times[i]);
                }
            }
        }
        return sorted;
    };

    return (
        <div className='choose'>
            <div className='calendar'>
                {props.movieDates &&
                    props.movieDates.map((date, index) => (
                        <button
                            onClick={() => props.dateClicked(index)}
                            id={index}
                            key={index}
                            className='calendarBox'
                        >
                            <p id={`${index}date`}
                                className='date'>
                                {date.day}
                            </p>
                            <div className='days'>
                                <p id={`${index}day1`}
                                    className='day'>
                                    {date.month}
                                </p>
                                <p id={`${index}day2`}
                                    className='day'>
                                    {date.weekDay}
                                </p>
                            </div>
                        </button>
                    ))}
            </div>

            <div className='shownHours' id='shownHours'>
                <div className='hours'>
                    {props.movieDates &&
                        getTime().map((time, index) => (
                            <button
                                onClick={() => props.hourClicked(props.movieDates[index].takenSeats[time], index)}
                                id={`${index}hours`}
                                key={index}
                                className='hourBox'
                            >
                                <p id={`${index}number`}
                                    className='number'>
                                    {time}
                                </p>
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default BookingSection;





















