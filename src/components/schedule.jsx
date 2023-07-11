import React from 'react';


const Schedule = (props) => {

    const getCalendar = () => {
        let today = new Date();
        let dates = [];
        for (let i = 0; i < 7; i++) {
            let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const convertDate = () => {
        const weekDates = getCalendar();
        const convertedDates = weekDates.map(date => ({
            month: props.months[date.getMonth()],
            weekDay: props.week[date.getDay()],
            day: date.getDate()
        }));
        return convertedDates;
    };


    return (
        <div className='schedule'>
            <div className='calendar'>
                {convertDate().map((day, index) =>
                    <button id={index} key={index} onClick={() => props.buttonClicked(day, index)} className='calendarBox '>
                        <p id={`${index}date`} className='date'>{day.day}</p>
                        <div>
                            <p id={`${index}day1`} className='day '>{day.month}</p>
                            <p id={`${index}day2`} className='day '>{day.weekDay}</p>
                        </div>

                    </button>
                )}
            </div>
            <div className='movies'></div>
        </div>
    );
};

export default Schedule;

