import React from 'react';
import { url } from '../../services/movieservice';

const Movies = (props) => {

    const toArray = () => {
        const availableArray = [];
        if (!props.available) {
            return undefined;
        }
        for (let i = 0; i < props.available.length; i++) {
            availableArray.push(props.available[i]);
        }
        return availableArray;
    };

    return (
        <>
            <div className='moviesGrid'>
                <h1 className='dateTitle'>
                    {props.today.weekDay} {props.today.day} {props.today.month} <span style={{ color: '#D6D5C9' }}>Movies</span>
                </h1>
                {toArray() ? toArray().map((movie) => (
                    <img
                        onClick={() => props.picClick(movie.title)}
                        src={`${url}${movie.id}/${movie.poster}`}
                        className='moviePic'
                        key={movie.id}
                        alt={movie.title}
                    />
                )) : (
                    <img />
                )}
            </div>
        </>
    );
};

export default Movies;




























// import React, { Component } from 'react';
// import { url } from '../../services/movieservice';


// class Movies extends Component {

//     //get movies of the day from props
//     toArray = () => {
//         const availableArray = [];
//         if (!this.props.available) {
//             return undefined
//         }
//         for (let i = 0; i < this.props.available.length; i++) {
//             availableArray.push(this.props.available[i])
//         }
//         return availableArray;
//     }

//     render() {
//         return (
//             <React.Fragment>

//                 <div className='moviesGrid'>
//                     <h1 className='dateTitle'>{this.props.today.weekDay} {this.props.today.day} {this.props.today.month}  <span style={{ color: '#D6D5C9' }}>Movies</span>  </h1>
//                     {this.toArray() ? this.toArray().map((movie) =>
//                         <img
//                             onClick={() => this.props.picClick(movie.title)}
//                             src={url + movie.id + "/" + movie.poster}
//                             className='moviePic'
//                             key={movie.id}
//                             alt={movie.title} />
//                     ) : <img />}
//                 </div>

//             </React.Fragment>

//         );
//     }
// }

// export default Movies;