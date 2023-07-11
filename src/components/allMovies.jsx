import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import pic1 from '../images/test/1.jpg'
import pic2 from '../images/test/2.jpg'
import pic3 from '../images/test/3.jpg'
import pic4 from '../images/test/4.jpg'
import pic5 from '../images/test/5.jpg'

class AllMovies extends Component {

    //request get to api to get all movies then put them in state
    state = {
        movies: [pic1, pic2, pic3, pic4, pic5, pic1, pic2, pic3, pic4, pic5],
    }
    picClick = () => {
        window.location = '/moviePage'
        // window.location = `/allMovie/${id}`
    }

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
                <h1 className='allHead'>Currenty Showing In The Phantom <span style={{ color: 'rgba(162, 44, 41, 1)' }}>Cinema</span></h1>
                <div className='allMovies'>
                    {this.state.movies.map((movie, index) =>
                        <img onClick={this.picClick} src={movie} className='eachPic' key={index} />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default AllMovies;