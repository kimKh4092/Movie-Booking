import React from 'react';
import star from '../../images/star.png';
import circle from '../../images/circle.png';
import { url } from '../../services/movieservice';

const MovieInfo = (props) => {
    return (
        <>
            {props.currentMovie && (
                <div className='mainSection'>
                    <div className='info'>
                        <h1 className='head01'>{props.currentMovie.title}</h1>
                        <div className='details'>
                            <img className='star'
                                src={star}
                                alt="Star Icon" />
                            <p className='rate'>{props.currentMovie.rate}</p>
                            <p className='time'>{props.currentMovie.duration}</p>
                            <img className='circle'
                                src={circle}
                                alt="Circle Icon" />
                            <p className='genre'>{props.currentMovie.generes}</p>
                        </div>
                        <p className='director'>
                            Director: <span style={{ color: 'rgba(162, 44, 41, 1)' }}>{props.currentMovie.director}</span>
                        </p>
                        <p className='plot'>{props.currentMovie.description}</p>
                        <button className='buy'
                            onClick={props.showTickets}>Buy Tickets</button>
                    </div>

                    <img className='poster'
                        src={`${url}${props.currentMovie.id}/${props.currentMovie.poster}`}
                        alt="Movie Poster" />
                </div>
            )}
        </>
    );
};

export default MovieInfo;


