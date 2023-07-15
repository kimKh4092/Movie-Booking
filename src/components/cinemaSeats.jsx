import React, { Component } from 'react';
import seatPic from '../images/seat.png';
import selectedSeat from '../images/selected.png';
import reservedSeat from '../images/reserved.png'

class Seats extends Component {

    //test
    shownSeats = () => {
        const seats = [];
        for (let i = 0; i < 49; i++) {
            if (i % 2 === 0) {
                let seat = {
                    seatNumber: i + 1,
                    reserved: false
                }
                seats.push(seat)
            }
            else {
                let seat = {
                    seatNumber: i + 1,
                    reserved: true
                }
                seats.push(seat)
            }
        }
        return seats
    }


    render() {
        return (
            <div className='cinema'>
                <div className='front'></div>

                <div className='seats'>
                    <div className='section'>
                        {this.shownSeats().slice(25, 49).map(seat =>
                            seat.reserved ? <div className='defaultSeat'></div> :
                                <div className='reservedSeat'></div>)}
                    </div>

                    <div className='section'>
                        {this.shownSeats().slice(25, 49).map(seat =>
                            seat.reserved ? <div className='defaultSeat'></div> :
                                <div className='reservedSeat'></div>)}
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