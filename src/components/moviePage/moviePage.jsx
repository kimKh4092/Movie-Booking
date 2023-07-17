import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/movie.css';
import deleteIcon from '../../images/delete.png'

import { addClicked1, removeClicked1, addClicked2, removeClicked2 } from '../../utils/manageClass';



import BookingSection from './bookingSection';
import Seats from './cinemaSeats';
import MovieInfo from './movieInfo';

class MoviePage extends Component {

    //extract movie id from route parameters 
    //get movie info from services

    //test
    state = {

        hours: [
            {
                hour: 4,
                abriv: 'Pm'
            },
            {
                hour: 6,
                abriv: 'Pm'
            },
            {
                hour: 8,
                abriv: 'Pm'
            },
            {
                hour: 10,
                abriv: 'Pm'
            }
        ],

        dates: [
            {
                day: 8,
                month: 'July',
                weekDay: 'Friday'
            },
            {
                day: 9,
                month: 'July',
                weekDay: 'Saturday'
            },
            {
                day: 10,
                month: 'July',
                weekDay: 'Sunday'
            },
            {
                day: 11,
                month: 'July',
                weekDay: 'Monday'
            }

        ],
        chosenTickets: [

        ],
        dateIndex: 0,
        hourIndex: 0
    }

    goBack = () => {
        window.location = '/explore'
    }

    //need modification
    dateClicked = (index) => {
        removeClicked1(this.state.dateIndex);
        addClicked1(index);
        this.setState({ dateIndex: index });

        let div = document.getElementById('shownHours');
        div.classList.add('show');
    }

    //need modification
    hourClicked = (index) => {
        removeClicked2(this.state.hourIndex);
        addClicked2(index);
        this.setState({ hourIndex: index })
        let cinema = document.getElementById('cinema');
        cinema.classList.remove('hide')
    }

    selectSeat = (seat) => {
        if (seat.reserved) {
            alert('seat is already taken');
            return
        }

        let ticket = document.getElementById(`${seat.seatNumber}seat`);
        ticket.classList.replace('default', 'selected');

        let tickets = this.state.chosenTickets;
        if (tickets.includes(seat.seatNumber)) {
            return
        }
        tickets.push(seat.seatNumber);
        this.setState({ chosenTickets: tickets })
    }

    deleteSeat = (ticket) => {
        let deleted = document.getElementById(`${ticket}seat`);
        deleted.classList.replace('selected', 'default');

        let tickets = this.state.chosenTickets;
        const index = tickets.indexOf(ticket);
        tickets.splice(index, index + 1)
        this.setState({ chosenTickets: tickets })

    }

    totalPrice = () => {

        let tickets = this.state.chosenTickets;
        let total = tickets.length * 50;
        return total

    }

    render() {
        return (
            <React.Fragment>
                <nav>
                    <li className='nav'>
                        <ul className='navItem1'>
                            <Link className='navItem1' to='/explore'> Phantom Screen</Link>
                        </ul>
                        <ul className='navItem2'>
                            <Link to='/' className='joinUs'>Join us</Link></ul>
                    </li>
                </nav>

                <MovieInfo />

                <div className='bookSection'>
                    <h1 className='head02'>Choose The Realm Of Time And Cinema</h1>
                    <div className='ticketSection'>
                        <BookingSection hours={this.state.hours}
                            dates={this.state.dates}
                            dateClicked={this.dateClicked}
                            hourClicked={this.hourClicked} />

                        <div className='hide' id='cinema'>
                            <Seats select={this.selectSeat} />
                        </div>
                    </div>

                    <h1 className='ticketHead'>Tickets</h1>
                    <div className='choosenTickets'>
                        {this.state.chosenTickets.map(ticket =>
                            <div className='ticketBox'>
                                <p className='ticketText'>Seat Number {ticket}</p>
                                <p className='ticketPrice'>50$</p>
                                <img className='deleteIcon' src={deleteIcon} onClick={() => this.deleteSeat(ticket)} />
                            </div>)}
                    </div>
                    <button className='purchase'>purchase tickets {this.totalPrice()}$</button>
                </div>



            </React.Fragment>
        );
    }
}

export default MoviePage;