import React from 'react';


const Calendar = (props) => {

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
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weekDates = getCalendar();
        const convertedDates = weekDates.map(date => ({
            month: months[date.getMonth()],
            weekDay: week[date.getDay()],
            day: date.getDate()
        }));
        return convertedDates;
    };

    return (
        <div className='calendar'>
            {convertDate().map((day, index) =>
                <button key={index} onClick={() => props.buttonClicked(day)} className='calendarBox '>
                    <p className='date'>{day.day}</p>
                    <div>
                        <p className='day '>{day.month}</p>
                        <p className='day '>{day.weekDay}</p>
                    </div>

                </button>

            )}
        </div>
    );
};

export default Calendar;


