import React, { Component } from 'react';
import seatPic from '../../images/seat.png';
import selectedSeat from '../../images/selected.png';
import reservedSeat from '../../images/reserved.png'

class Seats extends Component {

    shownSeats = () => {
        const takenSeats = this.props.seats;
        const seats = [];
        if (!takenSeats) {
            return seats
        }
        for (let i = 0; i < 49; i++) {
            if (takenSeats.includes(i + 1)) {
                let seat = {
                    seatNumber: i + 1,
                    reserved: true
                }
                seats.push(seat)
            }
            else {
                let seat = {
                    seatNumber: i + 1,
                    reserved: false
                }
                seats.push(seat)
            }
        }
        return seats
    }

    render() {
        return (
            <div className='cinema'>

                <div className='seats'>
                    <div className='section'>
                        {this.shownSeats().slice(0, 24).map(seat =>
                            !seat.reserved ?
                                <div
                                    key={seat.seatNumber}
                                    id={`${seat.seatNumber}seat`}
                                    onClick={() => this.props.select(seat)}
                                    className='defaultSeat default'>
                                    {seat.seatNumber}
                                </div> :
                                <div
                                    key={seat.seatNumber}
                                    id={`${seat.seatNumber}seat`}
                                    onClick={() => this.props.select(seat)}
                                    className='defaultSeat reserved'>
                                    {seat.seatNumber}
                                </div>)}
                    </div>

                    <div className='section'>
                        {this.shownSeats().slice(24, 48).map(seat =>
                            !seat.reserved ? <div
                                key={seat.seatNumber}
                                id={`${seat.seatNumber}seat`}
                                onClick={() => this.props.select(seat)}
                                className='defaultSeat default'>
                                {seat.seatNumber}
                            </div> :
                                <div
                                    key={seat.seatNumber}
                                    id={`${seat.seatNumber}seat`}
                                    onClick={() => this.props.select(seat)}
                                    className='defaultSeat reserved'>
                                    {seat.seatNumber}
                                </div>)}
                    </div>

                </div>
                <div className='guide'>
                    <div className='guideBox'>
                        <img className='guidePic' src={seatPic} />
                        <p>avaliable</p>
                    </div>
                    <div className='guideBox'>
                        <img className='guidePic' src={reservedSeat} />
                        <p>reserved</p>
                    </div>
                    <div className='guideBox'>
                        <img className='guidePic' src={selectedSeat} />
                        <p>selected</p>
                    </div>

                </div>
            </div>
        );
    }
}

export default Seats;