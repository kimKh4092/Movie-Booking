import React, { Component } from 'react';
import deleteIcon from '../../images/delete.png';
import BookingSection from './bookingSection';
import Seats from './cinemaSeats';


class BookPage extends Component {
    state = {}
    render() {
        return (
            <div
                id='bookSection'
                className='bookSection hide' >
                <h1 className='head02'>Choose The Realm Of Time And Cinema</h1>
                <div className='ticketSection'>
                    <BookingSection
                        movieDates={this.props.movieDates}
                        dateIndex={this.props.dateIndex}
                        dateClicked={this.props.dateClicked}
                        hourClicked={this.props.hourClicked}
                    />
                    <div className='hide' id='cinema'>
                        <Seats
                            select={this.props.select}
                            seats={this.props.seats}
                        />
                    </div>
                </div>

                {this.props.chosenTickets.length !== 0 && <h1 className='ticketHead'>Tickets</h1>}

                <div className='choosenTickets'>
                    {this.props.chosenTickets.map((ticket) => (
                        <div key={ticket} className='ticketBox'>
                            <p className='ticketText'>Seat Number {ticket}</p>
                            <p className='ticketPrice'>50$</p>
                            <img
                                className='deleteIcon'
                                src={deleteIcon}
                                onClick={() => this.props.deleteSeat(ticket)}
                            />
                        </div>
                    ))}
                </div>

                {
                    this.props.chosenTickets.length !== 0 &&
                    <button onClick={this.props.submit}
                        className='purchase'>purchase tickets {this.props.totalPrice()}$</button>
                }
            </div >
        );
    }
}

export default BookPage;