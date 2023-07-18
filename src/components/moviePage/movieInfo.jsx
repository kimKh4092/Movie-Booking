import React, { Component } from 'react';
import star from '../../images/star.png';
import circle from '../../images/circle.png';
import { url } from '../../services/movieservice';

class MovieInfo extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                {this.props.currentMovie && <div className='mainSection'>
                    <div className='info'>
                        <h1 className='head01'>{this.props.currentMovie.title}</h1>
                        <div className='details'>
                            <img className='star' src={star} />
                            <p className='rate'>{this.props.currentMovie.rate}</p>
                            <p className='time'>{this.props.currentMovie.duration}</p>
                            <img className='circle' src={circle} />
                            <p className='genre'>{this.props.currentMovie.generes}</p>
                        </div>
                        <p className='director'>Director: <span style={{ color: 'rgba(162, 44, 41, 1)' }}>{this.props.currentMovie.director}</span></p>
                        <p className='plot'>{this.props.currentMovie.description}</p>
                        <button className='buy' onClick={this.props.showTickets}>Buy Tickets</button>
                    </div>

                    <img className='poster'
                        src={url + this.props.currentMovie.id + "/" + this.props.currentMovie.poster}></img>
                </div>}

            </React.Fragment>


        );
    }
}

export default MovieInfo;