import React, { useState, useEffect } from 'react';
import Movies from './movies';
import '../styles/explore.css'
import TopMovies from './topMovies';
import Schedule from './schedule';
import { Link } from 'react-router-dom';


const Explore = () => {

    const [date, setDate] = useState({});
    const [dateIndex, setIndex] = useState();

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const getToday = () => {
        let today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const converted = {
            month: months[today.getMonth()],
            weekDay: week[today.getDay()],
            day: today.getDate()
        }
        setDate(converted)
    }


    const addClicked = (index) => {
        let button = document.getElementById(index);
        let day1Text = document.getElementById(`${index}day1`);
        let day2Text = document.getElementById(`${index}day2`);
        let dateText = document.getElementById(`${index}date`);
        button.classList.add("clicked");
        dateText.classList.add('clickedDate');
        day1Text.classList.add("clickedDay");
        day2Text.classList.add("clickedDay");
        setIndex(index);
    }

    const removeClicked = (index) => {
        let button = document.getElementById(index);
        let day1Text = document.getElementById(`${index}day1`);
        let day2Text = document.getElementById(`${index}day2`);
        let dateText = document.getElementById(`${index}date`);
        button.classList.remove("clicked");
        dateText.classList.remove('clickedDate');
        day1Text.classList.remove("clickedDay");
        day2Text.classList.remove("clickedDay");

    }

    useEffect(() => {
        getToday();
        addClicked(0);
        //get request to get the movies of today
    }, []);


    const buttonClicked = (day, index) => {
        setDate(day);
        removeClicked(dateIndex);
        addClicked(index)
        //get request to get movies of the day
    }

    return (
        <>
            <nav>
                <li className='nav'>
                    <ul className='navItem1'>Phantom Screen</ul>
                    <ul className='navItem2'>
                        <Link to='/' className='joinLink'>Join us</Link></ul>
                </li>
            </nav>
            <TopMovies />
            <div className='main'>
                <Schedule months={months} week={week} buttonClicked={buttonClicked} />
                <Movies today={date} />
            </div>
        </>
    );
};

export default Explore;




// class Explore extends Component {
//     state = {}
//     render() {
//         return (
//             <React.Fragment>
//                 <nav>
//                     <li className='nav'>
//                         <ul className='navItem1'>Phantom Screen</ul>
//                         <ul className='navItem2'>Join us</ul>
//                     </li>
//                 </nav>
//                 <TopMovies />
//             </React.Fragment>

//         );
//     }
// }

// export default Explore;