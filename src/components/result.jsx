import React from 'react';
import { getCurrentUser } from '../services/authservice';
import { Link } from 'react-router-dom';

const Result = () => {
    //for test
    const chosenTickets = [1, 3, 4];

    const goBack = () => {
        window.location = '/explore';
    };

    return (
        <>
            <nav>
                <li className='nav'>
                    <ul className='navItem1'>
                        <Link className='navItem1' to='/explore'> Phantom Screen</Link>
                    </ul>

                    {!getCurrentUser() ? (
                        <ul className='navItem2'>
                            <Link to='/signup' className='joinUs'>Join us</Link>
                        </ul>
                    ) : (
                        <Link to='/profile' className='joinUs'>
                            <p className='navItem2'>{getCurrentUser()}</p>
                        </Link>
                    )}
                </li>
            </nav>

            <div className='success'>
                <h2 className='successTitle'>
                    your purchase was <span style={{ color: '#902923' }}> successfull</span>
                </h2>
                <h1 className='ticketInfo'>Ticket Information</h1>
                <h2 className='successTitle'>13 July <span style={{ color: '#902923' }}>6pm</span></h2>
                {chosenTickets.map((ticket) => (
                    <div className='ticketBox' key={ticket}>
                        <p className='ticketText'>Seat Number {ticket}</p>
                        <p className='ticketPrice'>50$</p>
                    </div>
                ))}
                <button onClick={goBack} className='purchase'>Back to main page</button>
            </div>
        </>
    );
};

export default Result;


























