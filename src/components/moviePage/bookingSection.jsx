import React, { Component } from 'react';


class BookingSection extends Component {

    getTime = () => {
        const movieDates = this.props.movieDates;
        const index = this.props.dateIndex;

        const times = Object.keys(movieDates[index].takenSeats);
        let sorted = [];
        let temp = 0;
        for (let i = 0; i < times.length; i++) {
            if (i === 0) {
                temp = times[i]
            }
            else {
                if (i === times.length - 1) {
                    sorted.push(times[i])
                    sorted.push(temp)
                } else {
                    sorted.push(times[i])

                }
            }
        }
        return sorted
    }


    render() {
        return (
            <div className='choose'>

                <div className='calendar'>
                    {this.props.movieDates &&
                        this.props.movieDates.map((date, index) =>
                            <button onClick={() => this.props.dateClicked(index)}
                                id={index}
                                key={index}
                                className='calendarBox '>
                                <p id={`${index}date`} className='date'>{date.day}</p>
                                <div className='days'>
                                    <p id={`${index}day1`}
                                        className='day '>{date.month}</p>
                                    <p id={`${index}day2`}
                                        className='day '>{date.weekDay}</p>
                                </div>
                            </button>
                        )}
                </div>

                <div className='shownHours'
                    id='shownHours'>
                    <div className='hours'>
                        {this.props.movieDates &&
                            this.getTime().map((time, index) =>
                                <button
                                    onClick={() => this.props.hourClicked(this.props.movieDates[index].takenSeats[time], index)}
                                    id={`${index}hours`}
                                    key={index}
                                    className='hourBox'>
                                    <p id={`${index}number`}
                                        className='number'>{time}</p>

                                </button>
                            )}
                    </div>
                </div>

            </div>


        );
    }
}

export default BookingSection;