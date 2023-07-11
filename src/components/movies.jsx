import React, { Component } from 'react';


import pic1 from '../images/test/1.jpg'
import pic2 from '../images/test/2.jpg'
import pic3 from '../images/test/3.jpg'
import pic4 from '../images/test/4.jpg'
import pic5 from '../images/test/5.jpg'


class Movies extends Component {

    state = {
        movies: [pic1, pic2, pic3, pic4, pic5, pic1, pic2, pic3, pic4, pic5],
    }

    render() {
        return (
            <React.Fragment>

                <div className='moviesGrid'>
                    <h1 className='dateTitle'>{this.props.today.weekDay} {this.props.today.day} {this.props.today.month}  <span style={{ color: '#D6D5C9' }}>Movies</span>  </h1>
                    {this.state.movies.map((movie, index) =>
                        <img src={movie} className='moviePic' key={index} />
                    )}
                </div>
            </React.Fragment>

        );
    }
}

export default Movies;