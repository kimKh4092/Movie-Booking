import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/movie.css'
import star from '../images/star.png';
import circle from '../images/circle.png';
import { addClicked1, removeClicked1, addClicked2, removeClicked2 } from '../utils/manageClass';


import pic4 from '../images/test/4.jpg'
import BookingSection from './bookingSection';
import Seats from './cinemaSeats';

class MoviePage extends Component {

    //extract movie id from route parameters 
    //get movie info from services
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
        dateIndex: 0,
        hourIndex: 0
    }

    goBack = () => {
        window.location = '/explore'
    }

    dateClicked = (index) => {
        removeClicked1(this.state.dateIndex);
        addClicked1(index);
        this.setState({ dateIndex: index });

        let div = document.getElementById('shownHours');
        div.classList.add('show');
    }

    hourClicked = (index) => {
        removeClicked2(this.state.hourIndex);
        addClicked2(index);
        this.setState({ hourIndex: index })

        let cinema = document.getElementById('cinema');
        cinema.classList.remove('hide')
    }

    render() {
        return (
            <React.Fragment>
                <nav>
                    <li className='nav'>
                        <ul className='navItem1' onClick={this.goBack}>Phantom Screen</ul>
                        <ul className='navItem2'>
                            <Link to='/' className='joinUs'>Join us</Link></ul>
                    </li>
                </nav>

                <div className='mainSection'>
                    <div className='info'>
                        <h1 className='head01'>Decision to leave</h1>
                        <div className='details'>
                            <img className='star' src={star} />
                            <p className='rate'>7.3</p>
                            <p className='time'>2h 19m</p>
                            <img className='circle' src={circle} />
                            <p className='genre'>Cirme, Drama, Mystery</p>
                        </div>
                        <p className='director'>Director: <span style={{ color: 'rgba(162, 44, 41, 1)' }}>Park Chan-Wook</span></p>
                        <p className='plot'>A detective investigating a man's death in the mountains meets the dead man's mysterious wife in the course of his dogged sleuthing.</p>
                        <button className='buy'>Buy Tickets</button>
                    </div>

                    <img className='poster' src={pic4}></img>
                </div>


                <div className='bookSection'>
                    <h1 className='head02'>Choose The Realm Of Time And Cinema</h1>
                    <div className='ticketSection'>
                        <BookingSection hours={this.state.hours}
                            dates={this.state.dates}
                            dateClicked={this.dateClicked}
                            hourClicked={this.hourClicked} />
                        <div className='hide' id='cinema'>
                            <Seats />
                        </div>
                    </div>
                    <div className='choosenTickets'></div>
                </div>



            </React.Fragment>
        );
    }
}

export default MoviePage;