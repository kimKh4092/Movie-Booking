import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authservice";
import { removeClicked1, addClicked1 } from "../utils/manageClass";
import { getMovieById, geuUserTicketHistory } from "../services/movieservice";
import { url } from "../services/movieservice";
import { getCurrentUserID } from "./../services/authservice";

const Profile = () => {
  const [dateIndex, setDateIndex] = useState(null);

  //for test
  const [tickets, setTickets] = useState([
    {
      day: "8",
      month: "july",
      weekDay: "monday",
      sans: [
        {
          time: "10pm",
          seat: [2, 5, 4],
          movie: "Decision to Leave",
        },
        {
          time: "8pm",
          seat: [8, 10],
          movie: "Drive ",
        },
      ],
    },
    {
      day: "9",
      month: "july",
      weekDay: "monday",
      sans: [
        {
          time: "10pm",
          seat: [2, 5],
          movie: "Decision to Leave",
        },
        {
          time: "8pm",
          seat: [8, 10],
          movie: "Decision to Leave",
        },
      ],
    },
    {
      day: "10",
      month: "july",
      weekDay: "monday",
      sans: [
        {
          time: "10pm",
          seat: [2, 5],
          movie: "Decision to Leave",
        },
        {
          time: "6pm",
          seat: [8, 10],
          movie: "Decision to Leave",
        },
      ],
    },
  ]);

  const [chosen, setChosen] = useState(null);
  const [movies, setMovies] = useState();

  //   useEffect(() => {
  //     //get history in this format and then setTickets
  //     //{
  //     //     day: '9',
  //     //     month: 'july',
  //     //     weekDay: 'monday',
  //     //     sans:
  //     //         [{
  //     //             time: '10pm',
  //     //             seat: [2, 5],
  //     //             movie: 'Decision to Leave'
  //     //         },
  //     //         {
  //     //             time: '8pm',
  //     //             seat: [8, 10],
  //     //             movie: 'Decision to Leave'
  //     //         }]
  //     // }
  //     fetchTicket();
  //   }, []);

  //   const fetchTicket = async () => {
  //     const request = {
  //       userId: getCurrentUserID(),
  //     };
  //     try {
  //       const ticketHistory = await geuUserTicketHistory(request);
  //       setTickets(ticketHistory);
  //     } catch (error) {}
  //   };

  const getCurrent = async (ticket) => {
    const movies = {};
    for (let i in ticket.sans) {
      const currentMovie = await getMovieById(`${ticket.sans[i].movie}`);
      if (!currentMovie) {
        return;
      }
      movies[ticket.sans[i].time] = currentMovie;
    }
    setMovies(movies);
  };

  const buttonClicked = (ticket, index) => {
    if (dateIndex !== null) {
      removeClicked1(dateIndex);
    }

    addClicked1(index);

    setDateIndex(index);
    for (let i in tickets) {
      if (tickets[i].day === ticket.day) {
        setChosen(tickets[i]);
        getCurrent(tickets[i]);
      }
    }
  };

  const logoutUser = () => {
    logout();
    window.location = "/";
  };

  return (
    <>
      <nav>
        <li className="nav">
          <ul className="navItem1">
            <Link className="navItem1" to="/explore">
              {" "}
              Phantom Screen
            </Link>
          </ul>
          {!getCurrentUser() ? (
            <ul className="navItem2">
              <Link to="/signup" className="joinUs">
                Join us
              </Link>
            </ul>
          ) : (
            <div className="userOptions">
              <p className="navItem2">{getCurrentUser()}</p>
              <p onClick={logoutUser} className="navItem3">
                Logout
              </p>
            </div>
          )}
        </li>
      </nav>
      <div className="profile">
        <h2 className="qoute">
          "This house is so full of people it makes me sick"
        </h2>
        <h2 className="qoute">- Home alone</h2>
        <h2 className="profileTitle">
          wellcome home{" "}
          <span style={{ color: "#902923" }}> {getCurrentUser()}</span>
        </h2>

        <div className="historyCalendar">
          <div className="schedule">
            <h2 className="historyTitle">history of tickets</h2>
            <div className="calendar">
              {tickets &&
                tickets.map((ticket, index) => (
                  <button
                    id={index}
                    key={index}
                    onClick={() => buttonClicked(ticket, index)}
                    className="calendarBox "
                  >
                    <p id={`${index}date`} className="date">
                      {ticket.day}
                    </p>
                    <div className="days">
                      <p id={`${index}day1`} className="day ">
                        {ticket.month}
                      </p>
                      <p id={`${index}day2`} className="day ">
                        {ticket.weekDay}
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {chosen !== null && (
            <div className="history">
              <div className="ticketTimes">
                {chosen.sans.map((time, index) => {
                  return (
                    <div className="history">
                      <div className="historyTicket">
                        <h2 id={index} className="ticketTime">
                          {time.time}
                        </h2>
                        {time.seat.map((seat) => (
                          <div key={seat} className="ticketBox">
                            <p className="ticketText">Seat Number {seat}</p>
                            <p className="ticketPrice">50$</p>
                          </div>
                        ))}
                      </div>
                      {movies && movies[time.time] && (
                        <img
                          className="historyPoster"
                          src={`${url}${movies[time.time].id}/${
                            movies[time.time].poster
                          }`}
                          alt="Movie Poster"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { getCurrentUser } from '../services/authservice';
// import Schedule from './home/schedule'
// import { months, week } from '../utils/dateData';

// class Profile extends Component {
//     state = {}

//     buttonClicked = async (day, index) => {
//         setDate(day);

//         removeClicked1(dateIndex);
//         addClicked1(index);
//         setIndex(index);

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

//                 <h2 className='qoute'>"This house is so full of people it makes me sick"
//                 </h2>
//                 <h2 className='qoute'>
//                     - Home alone</h2>
//                 <h2 className='profileTitle'>
//                     wellcome home <span style={{ color: '#902923' }}> {getCurrentUser()}</span>
//                 </h2>

//                 <div className='history'>
//                     <h2 className='historyTitle'>history of tickets</h2>
//                     <Schedule months={months} week={week}
//                         buttonClicked={buttonClicked} />
//                 </div>

//             </React.Fragment>

//         );
//     }
// }

// export default Profile;
