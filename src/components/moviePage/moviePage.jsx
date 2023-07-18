import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/movie.css';
import deleteIcon from '../../images/delete.png';

import { addClicked1, removeClicked1, addClicked2, removeClicked2 } from '../../utils/manageClass';

import { getCurrentUser } from '../../services/authservice';

import BookingSection from './bookingSection';
import Seats from './cinemaSeats';
import MovieInfo from './movieInfo';

import { getMovieById } from '../../services/movieservice';
import { useParams } from 'react-router-dom';

const MoviePage = () => {

    const [movie, setMovie] = useState()

    const params = useParams();

    useEffect(() => {
        fetchMovie();

    }, []);


    const fetchMovie = async () => {
        const currentMovie = await getMovieById(params.id);
        setMovie(currentMovie);
        console.log(currentMovie);
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
    const hours = [
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
    ];

    const dates = [
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
    ];

    const [chosenTickets, setChosenTickets] = useState([]);
    const [dateIndex, setDateIndex] = useState(0);
    const [hourIndex, setHourIndex] = useState(0);

    const dateClicked = (index) => {
        removeClicked1(dateIndex);
        addClicked1(index);
        setDateIndex(index);

        let div = document.getElementById('shownHours');
        div.classList.add('show');
    };

    const hourClicked = (index) => {
        removeClicked2(hourIndex);
        addClicked2(index);
        setHourIndex(index);
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

        let tickets = chosenTickets;
        if (tickets.includes(seat.seatNumber)) {
            return;
        }
        tickets.push(seat.seatNumber);
        setChosenTickets(tickets);
    };

    const deleteSeat = (ticket) => {
        let deleted = document.getElementById(`${ticket}seat`);
        deleted.classList.replace('selected', 'default');

        let tickets = chosenTickets;
        const index = tickets.indexOf(ticket);
        tickets.splice(index, index + 1);
        setChosenTickets(tickets);
    };

    const totalPrice = () => {
        let tickets = chosenTickets;
        let total = tickets.length * 50;
        return total;
    };

    const showTickets = () => {
        if (getCurrentUser()) {
            const bookSection = document.getElementById('bookSection');
            bookSection.classList.remove('hide');
            select('bookSection')
        } else {
            window.location = '/signup';
        }
    };

    return (
        <React.Fragment>
            <nav>
                <li className='nav'>
                    <ul className='navItem1'>
                        <Link className='navItem1' to='/explore'>
                            Phantom Screen
                        </Link>
                    </ul>
                    {!getCurrentUser() ? (
                        <ul className='navItem2'>
                            <Link to='/signup' className='joinUs'>
                                Join us
                            </Link>
                        </ul>
                    ) : (
                        <p className='navItem2'>{getCurrentUser()}</p>
                    )}
                </li>
            </nav>

            <MovieInfo ref={movieInfo}
                currentMovie={movie}
                showTickets={showTickets}
            />



            <div ref={bookSection} id='bookSection' className='bookSection hide'>
                <h1 className='head02'>Choose The Realm Of Time And Cinema</h1>
                <div className='ticketSection'>
                    <BookingSection
                        hours={hours}
                        dates={dates}
                        dateClicked={dateClicked}
                        hourClicked={hourClicked}
                    />

                    <div className='hide' id='cinema'>
                        <Seats select={selectSeat} />
                    </div>
                </div>

                <h1 className='ticketHead'>Tickets</h1>
                <div className='choosenTickets'>
                    {chosenTickets.map((ticket) => (
                        <div className='ticketBox'>
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
                <button className='purchase'>purchase tickets {totalPrice()}$</button>
            </div>


        </React.Fragment>
    );
};

export default MoviePage;





























// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import '../../styles/movie.css';
// import deleteIcon from '../../images/delete.png'

// import { addClicked1, removeClicked1, addClicked2, removeClicked2 } from '../../utils/manageClass';

// import { getCurrentUser } from '../../services/authservice';

// import BookingSection from './bookingSection';
// import Seats from './cinemaSeats';
// import MovieInfo from './movieInfo';

// import { getMovieById } from '../../services/movieservice';

// class MoviePage extends Component {

//     //extract movie id from route parameters
//     //get movie info from services

//     //test
//     state = {

//         hours: [
//             {
//                 hour: 4,
//                 abriv: 'Pm'
//             },
//             {
//                 hour: 6,
//                 abriv: 'Pm'
//             },
//             {
//                 hour: 8,
//                 abriv: 'Pm'
//             },
//             {
//                 hour: 10,
//                 abriv: 'Pm'
//             }
//         ],

//         dates: [
//             {
//                 day: 8,
//                 month: 'July',
//                 weekDay: 'Friday'
//             },
//             {
//                 day: 9,
//                 month: 'July',
//                 weekDay: 'Saturday'
//             },
//             {
//                 day: 10,
//                 month: 'July',
//                 weekDay: 'Sunday'
//             },
//             {
//                 day: 11,
//                 month: 'July',
//                 weekDay: 'Monday'
//             }

//         ],
//         chosenTickets: [

//         ],
//         dateIndex: 0,
//         hourIndex: 0
//     }

//     goBack = () => {
//         window.location = '/explore'
//     }

//     //need modification
//     dateClicked = (index) => {
//         removeClicked1(this.state.dateIndex);
//         addClicked1(index);
//         this.setState({ dateIndex: index });

//         let div = document.getElementById('shownHours');
//         div.classList.add('show');
//     }

//     //need modification
//     hourClicked = (index) => {
//         removeClicked2(this.state.hourIndex);
//         addClicked2(index);
//         this.setState({ hourIndex: index })
//         let cinema = document.getElementById('cinema');
//         cinema.classList.remove('hide')
//     }

//     selectSeat = (seat) => {
//         if (seat.reserved) {
//             alert('seat is already taken');
//             return
//         }

//         let ticket = document.getElementById(`${seat.seatNumber}seat`);
//         ticket.classList.replace('default', 'selected');

//         let tickets = this.state.chosenTickets;
//         if (tickets.includes(seat.seatNumber)) {
//             return
//         }
//         tickets.push(seat.seatNumber);
//         this.setState({ chosenTickets: tickets })
//     }

//     deleteSeat = (ticket) => {
//         let deleted = document.getElementById(`${ticket}seat`);
//         deleted.classList.replace('selected', 'default');

//         let tickets = this.state.chosenTickets;
//         const index = tickets.indexOf(ticket);
//         tickets.splice(index, index + 1)
//         this.setState({ chosenTickets: tickets })

//     }

//     totalPrice = () => {

//         let tickets = this.state.chosenTickets;
//         let total = tickets.length * 50;
//         return total

//     }

//     componentDidMount() {
//     }


//     showTickets() {
//         if (getCurrentUser()) {
//             const bookSection = document.getElementById('bookSection');
//             bookSection.classList.remove('hide')
//         }
//         else {
//             window.location = '/signup'
//         }


//     }

//     render() {
//         return (
//             <React.Fragment>
//                 <nav>
//                     <li className='nav'>
//                         <ul className='navItem1'>
//                             <Link className='navItem1' to='/explore'> Phantom Screen</Link>
//                         </ul>
//                         {!getCurrentUser() ? <ul className='navItem2'>
//                             <Link to='/signup' className='joinUs'>Join us</Link></ul> :
//                             <p className='navItem2'>{getCurrentUser()}</p>}
//                     </li>
//                 </nav>

//                 <MovieInfo showTickets={this.showTickets} />


//                 <div id='bookSection' className='bookSection hide'>
//                     <h1 className='head02'>Choose The Realm Of Time And Cinema</h1>
//                     <div className='ticketSection'>
//                         <BookingSection hours={this.state.hours}
//                             dates={this.state.dates}
//                             dateClicked={this.dateClicked}
//                             hourClicked={this.hourClicked} />

//                         <div className='hide' id='cinema'>
//                             <Seats select={this.selectSeat} />
//                         </div>
//                     </div>

//                     <h1 className='ticketHead'>Tickets</h1>
//                     <div className='choosenTickets'>
//                         {this.state.chosenTickets.map(ticket =>
//                             <div className='ticketBox'>
//                                 <p className='ticketText'>Seat Number {ticket}</p>
//                                 <p className='ticketPrice'>50$</p>
//                                 <img className='deleteIcon' src={deleteIcon} onClick={() => this.deleteSeat(ticket)} />
//                             </div>)}
//                     </div>
//                     <button className='purchase'>purchase tickets {this.totalPrice()}$</button>
//                 </div>



//             </React.Fragment>
//         );
//     }
// }

// export default MoviePage;