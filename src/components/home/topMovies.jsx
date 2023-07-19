import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/explore.css";
import { url } from "../../services/movieservice";

const TopMovies = (props) => {
    const { topMovies, picClick } = props;
    const [startIndex, setStartIndex] = useState(0);

    const showTop = () => {
        const shown = topMovies.slice(startIndex, startIndex + 3);
        if (startIndex > 2) {
            const extra = topMovies.slice(0, 3 - shown.length);
            extra.forEach((movie) => {
                if (movie && movie.id) {
                    shown.push(movie);
                }
            });
        }
        return shown;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            goToNextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const goToPreviousSlide = () => {
        setStartIndex((prevIndex) =>
            prevIndex === 0 ? topMovies.length - 1 : prevIndex - 1
        );
    };

    const goToNextSlide = () => {
        setStartIndex((prevIndex) =>
            prevIndex === topMovies.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <>
            <h2 className="head2">Top Movies</h2>
            <div className="topMovies">
                <i onClick={goToNextSlide}
                    className="fa fa-arrow-circle-left white fa-4x"
                    aria-hidden="true"
                ></i>

                {showTop().map((movie, index) => {
                    if (movie && movie.id) {
                        return (
                            <img
                                onClick={picClick}
                                src={`${url}${movie.id}/${movie.poster}`}
                                className="pic smooth"
                                key={index}
                                alt={movie.title}
                            />
                        );
                    }
                    return null;
                })}

                <i onClick={goToPreviousSlide}
                    className="fa fa-arrow-circle-right white fa-4x"
                    aria-hidden="true"
                ></i>
            </div>

            <div className="mobile">
                {showTop().map((movie, index) => {
                    if (movie && movie.id) {
                        return (
                            <img
                                src={`${url}${movie.id}/${movie.poster}`}
                                className="pic smooth"
                                key={index}
                                alt={movie.title}
                            />
                        );
                    }
                    return null;
                })}
            </div>

            <h3 className="head3">
                <Link to="/allMovies"
                    className="link3">
                    All movies
                </Link>
            </h3>
        </>
    );
};

export default TopMovies;
