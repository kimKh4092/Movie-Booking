import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/movie.css'
import star from '../images/star.png';
import circle from '../images/circle.png';

import pic4 from '../images/test/4.jpg'

class MoviePage extends Component {
    state = {}

    goBack = () => {
        window.location = '/explore'
    }

    render() {
        return (
            <React.Fragment>
                <nav>
                    <li className='nav'>
                        <ul className='navItem1' onClick={this.goBack}>Phantom Screen</ul>
                        <ul className='navItem2'>
                            <Link to='/' className='joinLink'>Join us</Link></ul>
                    </li>
                </nav>

                <div className='mainSection'>
                    <div className='info'>
                        <h1 className='head'>Decision to leave</h1>
                        <div className='details'>
                            <img className='star' src={star} />
                            <p className='rate'>7.3</p>
                            <p className='time'>2h 19m</p>
                            <img className='circle' src={circle} />
                            <p className='genre'>Cirme, Drama, Mystery</p>
                        </div>
                        <p className='director'>Director: <span style={{ color: 'rgba(162, 44, 41, 1)' }}>Park Chan-Wook</span></p>
                        <p className='plot'>A detective investigating a man's death in the mountains meets the dead man's mysterious wife in the course of his dogged sleuthing.</p>
                        <button className='book'>Buy Tickets</button>
                    </div>

                    <img className='poster' src={pic4}></img>
                </div>


            </React.Fragment>
        );
    }
}

export default MoviePage;