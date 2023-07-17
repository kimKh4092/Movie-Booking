import PocketBase from "pocketbase";
import AllMovies from "./../components/allMovies";

const pb = new PocketBase("http://212.129.63.142:8090");

export const url = "http://212.129.63.142:8090/api/files/movies/";

//get all movies
export async function getMovies() {
    try {
        const records = await pb
            .collection("movies")
            .getFullList({}, { $autoCancel: false });
        console.log("movies");
        console.log(records);
        return records;
    } catch (error) {
        console.error("Error getting movies record:", error);
    }
}

//get top movies
export async function getTopMovies() {
    try {
        const top = await pb
            .collection("movies")
            .getList(1, 5, { $autoCancel: false });
        return top;
    } catch (error) {
        console.error("Error getting topMovies record:", error);
    }
}

//get movies of a specific day
export async function availableMovies(date) {
    try {
        const resultList = await pb.collection("movie_sans").getList(1, 50, {
            filter: `day = "${date.day} ${date.month.toLowerCase()}"`,
            $autoCancel: false,
        });
        return resultList.items;
    } catch (error) {
        console.error("Error getting daily movies", error);
    }
}

//get a movie by id
export function getMovieById(AllMovies, movieId, date) {
    console.log(movieId, AllMovies, date);
    const day = `${date.day} ${date.month.toLowerCase()}`;

    if (!Array.isArray(movieId)) {
        console.error("movieId is not an array or is undefined");
        return;
    }

    const uniqueMovies = [];
    // Filter out duplicated objects based on sans.day and unique sans.movie values
    const filterableMovieIds = movieId.filter((sans) => {
        if (sans.day === day && !uniqueMovies.includes(sans.movie)) {
            uniqueMovies.push(sans.movie);
            return true;
        }
        return false;
    });

    console.log(filterableMovieIds);

    // Example: Access the movie details based on the filtered IDs
    const matchedMovies = AllMovies.filter((movie) =>
        filterableMovieIds.some((sans) => sans.movie === movie.id)
    );

    return matchedMovies;
}

export async function getSanses() {
    try {
        const records = await pb.collection("movie_sans").getFullList({}, {});
        return records;
    } catch (error) {
        console.error("Error getting movies record:", error);
    }
}