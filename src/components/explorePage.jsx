import React, { useState, useEffect } from 'react';
import Movies from './movies';
import '../styles/explore.css'
import TopMovies from './topMovies';
import Schedule from './schedule';
import { Link } from 'react-router-dom';
import { addClicked1, removeClicked1 } from '../utils/manageClass';


const Explore = () => {

    //get request for topmovies 
    //need state
    //pass them to topmovies component

    //get request for movies of the date 
    //need state
    //pass them to movies

    const [date, setDate] = useState({});
    const [dateIndex, setIndex] = useState(0);

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

    useEffect(() => {
        getToday();
        addClicked1(0);
        //get request to get the movies of today
        //get request to get topmovies
    }, []);

    const buttonClicked = (day, index) => {
        setDate(day);
        removeClicked1(dateIndex);
        addClicked1(index);
        setIndex(index);
    }


    const picClick = () => {
        window.location = '/moviePage'
        // window.location = `/allMovie/${id}`
    }

    return (
        <>
            <nav>
                <li className='nav'>
                    <ul className='navItem1'>Phantom Screen</ul>
                    <ul className='navItem2'>
                        {/* sign up or sign in route */}
                        <Link to='/' className='joinUs'>Join us</Link></ul>
                </li>
            </nav>

            <TopMovies picClick={picClick} />

            <div className='main'>
                <Schedule months={months} week={week} buttonClicked={buttonClicked} />
                <Movies picClick={picClick} today={date} />
            </div>
        </>
    );
};

export default Explore;

