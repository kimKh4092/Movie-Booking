import React, { useState, useEffect } from 'react';
import Movies from './movies';
import '../../styles/explore.css'
import TopMovies from './topMovies';
import Schedule from './schedule';
import { Link } from 'react-router-dom';
import { addClicked1, removeClicked1 } from '../../utils/manageClass';
import { getToday, months, week } from '../../utils/dateData';
import { getMovies, availableMovies, getTopMovies } from '../../services/movieservice';

const Explore = () => {

    const [movies, setMovies] = useState([]);
    const [available, setAvailable] = useState();
    const [topMovies, setTop] = useState();

    const [dateIndex, setIndex] = useState(0);
    const [date, setDate] = useState({});

    useEffect(() => {
        const today = getToday();
        setDate(today);
        addClicked1(0);

        //get all movies
        (async () => {
            const records = await getMovies();
            setMovies(records);
        })();

        //get request to get topmovies
        (async () => {
            const top = await getTopMovies();
            setTop(top);
        })();

        //get request to get the movies of today
        (async () => {
            const newAvailable = await availableMovies(today);
            setAvailable(newAvailable);
        })();

    }, []);

    const filteredAvailable = (list) => {
        console.log('filter')

        if (!list) {
            console.log('null');
            return
        }

        // const newList = list.items.filter((obj, index) => {
        //     return (
        //         index === list.items.findIndex((o) => obj.movie === o.movie)
        //     );
        // });

        // const filteredMovies = [];
        // for (let i = 0; i < newList.length; i++) {
        //     const record = movies[i];
        //     filteredMovies.push(record);
        // }

        // return filteredMovies;
    }


    const buttonClicked = async (day, index) => {
        setDate(day);

        removeClicked1(dateIndex);
        addClicked1(index);
        setIndex(index);

        const newAvailable = await availableMovies(day);
        setAvailable(newAvailable)
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
                <Movies
                    available={available}
                    picClick={picClick}
                    today={date} />
            </div>
        </>
    );
};

export default Explore;

