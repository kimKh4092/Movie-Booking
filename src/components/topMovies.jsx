import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/explore.css'

import pic1 from '../images/test/1.jpg'
import pic2 from '../images/test/2.jpg'
import pic3 from '../images/test/3.jpg'
import pic4 from '../images/test/4.jpg'
import pic5 from '../images/test/5.jpg'


const TopMovies = () => {
    const topMovies = [pic1, pic2, pic3, pic4, pic5];
    const [startIndex, setStartIndex] = useState(0);


    const showTop = () => {
        const shown = topMovies.slice(startIndex, startIndex + 3);
        if (startIndex > 2) {
            const extra = topMovies.slice(0, 3 - shown.length);
            extra.forEach(pic => shown.push(pic));
        }
        return shown;
    };

    //slideshow

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         goToNextSlide();
    //     }, 3000);

    //     return () => clearInterval(interval);
    // }, []);

    const goToPreviousSlide = () => {
        setStartIndex((prevIndex) => (prevIndex === 0 ? topMovies.length - 1 : prevIndex - 1));
    };

    const goToNextSlide = () => {
        setStartIndex((prevIndex) => (prevIndex === topMovies.length - 1 ? 0 : prevIndex + 1));
    };


    return (
        <>
            <h2 className='head2'>Top Movies</h2>
            <div className='topMovies'>
                <i onClick={goToNextSlide} className="fa fa-arrow-circle-left white fa-4x" aria-hidden="true"></i>

                {showTop().map((movie, index) => (
                    <img src={movie} className='pic' key={index} />
                ))}

                <i onClick={goToPreviousSlide} className="fa fa-arrow-circle-right white fa-4x" aria-hidden="true"></i>
            </div>
            <h3 className='head3'>
                <Link to='/allMovies' className='link3'>All movies</Link>
            </h3>
        </>
    );
};

export default TopMovies;




// class TopMovies extends Component {
//     state = {
//         topMovies: [pic1, pic2, pic3, pic4, pic5],
//         startIndex: 0,
//     }

//     showTop = () => {
//         const topMovies = this.state.topMovies;
//         const shown = topMovies.slice(this.state.startIndex, this.state.startIndex + 3);
//         if (this.state.startIndex > 2) {
//             const extra = topMovies.slice(0, 3 - shown.length);
//             extra.map(pic => shown.push(pic))
//         }

//         return shown;
//     }


//     changeIndex = (i) => {
//         const topMovies = this.state.topMovies;
//         let start = this.state.startIndex;

//         if (i === 1) {
//             start = start + i;

//             if (start > 4) {
//                 start = 0
//             }
//             this.setState({ startIndex: start })
//         }

//         if (i === -1) {
//             let index = start - 1;
//             if (start === 0) {
//                 index = topMovies.length - 1;

//             }
//             console.log(index)
//             this.setState({ startIndex: index })
//         }
//     }

//     render() {

//         return (
//             <React.Fragment>
//                 <h2 className='head'>Top Movies</h2>
//                 <div className='topMovies'>
//                     <i onClick={() => this.changeIndex(-1)} className="fa fa-arrow-circle-left white fa-4x" aria-hidden="true"></i>

//                     {this.showTop().map(movie => <img src={movie} className='pic' />)}

//                     <i onClick={() => this.changeIndex(1)} className="fa fa-arrow-circle-right white fa-4x" aria-hidden="true"></i>
//                 </div>
//                 <h3>All movies</h3>
//             </React.Fragment>
//         );
//     }
// }

// export default TopMovies;