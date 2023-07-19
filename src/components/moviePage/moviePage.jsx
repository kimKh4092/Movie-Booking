import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

import '../../styles/movie.css';
import deleteIcon from '../../images/delete.png';
import BookingSection from './bookingSection';
import Seats from './cinemaSeats';
import MovieInfo from './movieInfo';
import {
    addClicked1,
    removeClicked1,
    addClicked2,
    removeClicked2
} from '../../utils/manageClass';
import {
    getMovieById,
    getMovieSanses
} from '../../services/movieservice';
import { getCurrentUser } from '../../services/authservice';
import { getToday } from '../../utils/dateData';

const MoviePage = () => {

    const [movie, setMovie] = useState()
    const [today, setDay] = useState()

    const params = useParams();

    useEffect(() => {
        const today = getToday()
        setDay(today)
        fetchMovie();

    }, []);

    const fetchMovie = async () => {
        const currentMovie = await getMovieById(params.id);
        setMovie(currentMovie);
    }

    const [Section, setSection] = useState('');
    const movieInfo = useRef(null);
    const bookSection = useRef(null);

    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: 'smooth'
        })
    }

    const select = (selected) => {
        setSection(selected);

        if (selected === 'movieInfor') {
            scrollToSection(movieInfo, selected)
        }
        if (selected === 'bookSection') {
            scrollToSection(bookSection, selected)
        }
    }

    //booksection

    const [movieDates, setDates] = useState()
    const [chosenTickets, setChosenTickets] = useState([]);
    const [dateIndex, setDateIndex] = useState(0);
    const [hourIndex, setHourIndex] = useState(0);
    const [seats, setSeats] = useState();

    const showTickets = async () => {
        if (getCurrentUser()) {
            const bookSection = document.getElementById('bookSection');
            bookSection.classList.remove('hide');
            select('bookSection');

            const sanses = await getMovieSanses(movie.id, today);
            setDates(sanses);

        } else {
            window.location = '/signup';
        }
    };

    const dateClicked = (index) => {

        removeClicked1(dateIndex);
        addClicked1(index);
        setDateIndex(index);

        let div = document.getElementById('shownHours');
        div.classList.add('show');
        for (let item in chosenTickets) {
            deleteSeat(chosenTickets[item]);
        }
        setChosenTickets([])
    };

    const hourClicked = (seats, index) => {

        removeClicked2(hourIndex);
        addClicked2(index);
        setHourIndex(index);
        setSeats(seats);

        for (let item in chosenTickets) {
            deleteSeat(chosenTickets[item]);
        }
        setChosenTickets([]);

        let cinema = document.getElementById('cinema');
        cinema.classList.remove('hide');
    };

    const selectSeat = (seat) => {
        if (seat.reserved) {
            alert('seat is already taken');
            return;
        }

        let ticket = document.getElementById(`${seat.seatNumber}seat`);
        ticket.classList.replace('default', 'selected');

        let tickets = [...chosenTickets];
        if (tickets.includes(seat.seatNumber)) {
            return;
        }
        tickets.push(seat.seatNumber);
        setChosenTickets(tickets);
    };

    const deleteSeat = (ticket) => {

        let deleted = document.getElementById(`${ticket}seat`);
        deleted.classList.replace('selected', 'default');

        let tickets = [...chosenTickets];
        const index = tickets.indexOf(ticket);
        if (index !== -1) {
            tickets.splice(index, 1);
            setChosenTickets(tickets);

        }
    };

    const totalPrice = () => {
        let tickets = chosenTickets;
        let total = tickets.length * 50;
        return total;
    };

    const submit = () => {
        window.location = '/result'
    }

    return (
        <React.Fragment>
            <nav>
                <li className='nav'>
                    <ul className='navItem1'>
                        <Link className='navItem1'
                            to='/explore'>
                            Phantom Screen
                        </Link>
                    </ul>
                    {!getCurrentUser() ? (
                        <ul className='navItem2'>
                            <Link to='/signup'
                                className='joinUs'>
                                Join us
                            </Link>
                        </ul>
                    ) : (
                        <Link to='/profile'
                            className='joinUs'>
                            <p className='navItem2'>{getCurrentUser()}</p></Link>
                    )}
                </li>
            </nav>

            <MovieInfo ref={movieInfo}
                currentMovie={movie}
                showTickets={showTickets}
            />

            <div ref={bookSection}
                id='bookSection'
                className='bookSection hide'>
                <h1 className='head02'>Choose The Realm Of Time And Cinema</h1>
                <div className='ticketSection'>
                    <BookingSection
                        movieDates={movieDates}
                        dateIndex={dateIndex}
                        dateClicked={dateClicked}
                        hourClicked={hourClicked}
                    />
                    <div className='hide' id='cinema'>
                        <Seats select={selectSeat}
                            seats={seats}
                        />
                    </div>
                </div>

                {chosenTickets.length !== 0 && <h1 className='ticketHead'>Tickets</h1>}

                <div className='choosenTickets'>
                    {chosenTickets.map((ticket) => (
                        <div key={ticket} className='ticketBox'>
                            <p className='ticketText'>Seat Number {ticket}</p>
                            <p className='ticketPrice'>50$</p>
                            <img
                                className='deleteIcon'
                                src={deleteIcon}
                                onClick={() => deleteSeat(ticket)}
                            />
                        </div>
                    ))}
                </div>
                {chosenTickets.length !== 0 &&
                    <button onClick={submit}
                        className='purchase'>purchase tickets {totalPrice()}$</button>}
            </div>
        </React.Fragment>
    );
};

export default MoviePage;


