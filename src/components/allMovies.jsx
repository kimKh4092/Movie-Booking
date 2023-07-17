import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../services/movieservice';
import { url } from '../services/movieservice';


const AllMovies = () => {

    const [movies, setMovies] = useState([]);

    const picClick = () => {
        window.location = '/moviePage'
        // window.location = `/allMovie/${id}`
    }

    useEffect(() => {
        //get all movies
        (async () => {
            const records = await getMovies();
            setMovies(records);
        })();

    }, [])

    const toArray = () => {
        const movieArray = [];
        if (!movies) {
            return []
        }
        for (let i = 0; i < movies.length; i++) {
            movieArray.push(movies[i])
        }
        return movieArray;
    }

    return (
        <React.Fragment>
            <nav>
                <li className='nav'>
                    <ul className='navItem1'>
                        <Link className='navItem1' to='/explore'> Phantom Screen</Link>
                    </ul>

                    <ul className='navItem2'>
                        <Link to='/'
                            className='joinUs'>Join us</Link></ul>
                </li>
            </nav>
            <h1 className='allHead'>Currenty Showing In The Phantom <span style={{ color: 'rgba(162, 44, 41, 1)' }}>Cinema</span></h1>
            <div className='allMovies'>
                {toArray().map((movie, index) =>

                    <div className='movieContain'>
                        <img onClick={picClick}
                            src={url + movie.id + "/" + movie.poster}
                            className='eachPic'
                            key={index} />
                    </div>
                )}
            </div>
        </React.Fragment>
    );

}

export default AllMovies;