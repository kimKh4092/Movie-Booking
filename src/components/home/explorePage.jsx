import React, { useState, useEffect } from 'react';
import Movies from './movies';
import '../../styles/explore.css'
import TopMovies from './topMovies';
import Schedule from './schedule';
import { Link } from 'react-router-dom';
import { addClicked1, removeClicked1 } from '../../utils/manageClass';
import { getToday, months, week } from '../../utils/dateData';
import { getCurrentUser } from '../../services/authservice';
import {
    getMovies,
    filterById,
    getSanses,
} from "../../services/movieservice";

const Explore = () => {

    const [movies, setMovies] = useState([]);
    const [sanses, setSanses] = useState([]);
    const [available, setAvailable] = useState([]);

    const [dateIndex, setIndex] = useState(0);
    const [date, setDate] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const today = getToday();
            setDate(today);
            addClicked1(0);

            const fetchedMovies = await getMovies();
            setMovies(fetchedMovies);

            const sanses = await getSanses();
            setSanses(sanses);

            fillingData(fetchedMovies, sanses, today);
        };

        fetchData();

        console.log(getCurrentUser())


    }, []);

    const fillingData = (moviesData, sansesData, date) => {
        const dailyMovies = filterById(moviesData, sansesData, date);
        setAvailable(dailyMovies);
    };

    const buttonClicked = async (day, index) => {
        setDate(day);

        removeClicked1(dateIndex);
        addClicked1(index);
        setIndex(index);

        const dailyMovies = filterById(movies, sanses, day);
        setAvailable(dailyMovies);
    }

    const picClick = (id) => {
        window.location = `/allMovies/${id}`
    }

    return (
        <>
            <nav>
                <li className='nav'>
                    <ul className='navItem1' >
                        <Link className='navItem1' to='/explore'> Phantom Screen</Link>
                    </ul>
                    {!getCurrentUser() ? <ul className='navItem2'>
                        <Link to='/signup' className='joinUs'>Join us</Link></ul> :
                        <p className='navItem2'>{getCurrentUser()}</p>}

                </li>
            </nav>

            <TopMovies topMovies={movies.slice(0, 5)} />

            <div className="main">
                <Schedule months={months} week={week} buttonClicked={buttonClicked} />
                <Movies available={available} picClick={picClick} today={date} />
            </div>
        </>
    );
};

export default Explore;

