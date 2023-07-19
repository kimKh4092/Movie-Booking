import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../services/movieservice';
import { url } from '../services/movieservice';
import { getCurrentUser } from '../services/authservice';


const AllMovies = () => {

    const [movies, setMovies] = useState([]);

    const picClick = (id) => {
        window.location = `/allMovies/${id}`
    }

    useEffect(() => {
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
                    {!getCurrentUser() ? <ul className='navItem2'>
                        <Link to='/signup' className='joinUs'>Join us</Link></ul> :
                        <Link to='/profile' className='joinUs'>
                            <p className='navItem2'>{getCurrentUser()}</p></Link>}
                </li>
            </nav>

            <h1 className='allHead'>Currenty Showing In The Phantom <span style={{ color: 'rgba(162, 44, 41, 1)' }}>Cinema</span></h1>
            <div className='allMovies'>
                {toArray().map((movie, index) =>
                    <div key={index} className='movieContain'>
                        <img onClick={() => picClick(movie.title)}
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