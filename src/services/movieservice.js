import PocketBase from "pocketbase";
import AllMovies from "./../components/allMovies";
import { func } from "joi";

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


//filter movies to remove duplicate
export function filterById(AllMovies, movieId, date) {

    console.log(movieId, AllMovies, date);

    if (!Array.isArray(movieId)) {
        console.error("movieId is not an array or is undefined");
        return;
    }

    // Filter out duplicated objects based on sans.day and unique sans.movie values
    const filterableMovieIds = movieId.filter((sans) => sans.day === date.day);

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

export async function getMovieById(title) {
    try {
        const record = await pb.collection('movies')
            .getFirstListItem(`title="${title}"`, { $autoCancel: false });
        return record;
    }
    catch (error) {
        console.log(error)
    }
}

export async function getMovieSanses(id, today) {
    try {
        const records = await pb.collection("movie_sans").getFullList({
            filter: `movie= "${id}"`
        });
        const filtered = filterDates(records, today);
        return filtered;


    } catch (error) {
        console.error("Error getting movies record:", error);
    }
}

export function filterDates(records, today) {

    const dates = []
    for (let i = 0; i < 5; i++) {
        if (records[i].day >= today.day) {
            dates.push(records[i])
        }
    }
    return dates
}

