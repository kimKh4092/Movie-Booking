import PocketBase from "pocketbase";

const pb = new PocketBase("http://212.129.63.142:8090");

export const url = "http://212.129.63.142:8090/api/files/movies/";

//get all movies
export async function getMovies() {
    try {
        const records = await pb.collection("movies").getFullList({},
            { '$autoCancel': false });
        console.log('movies')
        console.log(records)
        return records;
    } catch (error) {
        console.error("Error getting movies record:", error);
    }
}

//get top movies
export async function getTopMovies() {
    try {
        const top = await pb.collection("movies").getList(1, 5,
            { '$autoCancel': false });
        return top

    } catch (error) {
        console.error("Error getting topMovies record:", error);
    }
}

//get movies of a specific day
export async function availableMovies(date) {
    try {
        const resultList = await pb.collection("movie_sans").getList(1, 50, {
            filter: `day = "${date.day} ${date.month.toLowerCase()}"`,
            '$autoCancel': false
        });
        console.log('available')
        console.log(resultList.items);
        return resultList.items;

    } catch (error) {
        console.error("Error getting daily movies", error);
    }
}

//get a movie by id
