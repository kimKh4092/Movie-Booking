import React, { Component } from 'react';


class BookingSection extends Component {


    render() {
        return (


            <div className='choose'>

                <div className='calendar'>
                    {this.props.dates.map((day, index) =>
                        <button onClick={() => this.props.dateClicked(index)} id={index} key={index} className='calendarBox '>
                            <p id={`${index}date`} className='date'>{day.day}</p>
                            <div className='days'>
                                <p id={`${index}day1`} className='day '>{day.month}</p>
                                <p id={`${index}day2`} className='day '>{day.weekDay}</p>
                            </div>
                        </button>
                    )}
                </div>
                <div className='shownHours' id='shownHours'>
                    <div className='hours'>
                        {this.props.hours.map((hour, index) =>
                            <button onClick={() => this.props.hourClicked(index)} id={`${index}hours`} key={index} className='hourBox'>
                                <p id={`${index}number`} className='number'>{hour.hour}</p>
                                <p id={`${index}abriv`} className='abriv'>{hour.abriv}</p>

                            </button>
                        )}
                    </div>
                </div>

            </div>


        );
    }
}

export default BookingSection;