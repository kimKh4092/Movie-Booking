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
    return records;
  } catch (error) {}
}

//get top movies
export async function getTopMovies() {
  try {
    const top = await pb
      .collection("movies")
      .getList(1, 5, { $autoCancel: false });
    return top;
  } catch (error) {}
}

//get movies of a specific day
export async function availableMovies(date) {
  try {
    const resultList = await pb.collection("movie_sans").getList(1, 50, {
      filter: `day = "${date.day} ${date.month.toLowerCase()}"`,
      $autoCancel: false,
    });
    return resultList.items;
  } catch (error) {}
}

//filter movies to remove duplicate
export function filterById(AllMovies, movieId, date) {
  if (!Array.isArray(movieId)) {
    return;
  }

  // Filter out duplicated objects based on sans.day and unique sans.movie values
  const filterableMovieIds = movieId.filter((sans) => sans.day === date.day);

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
  } catch (error) {}
}

export async function getMovieById(title) {
  try {
    const record = await pb
      .collection("movies")
      .getFirstListItem(`title="${title}"`, { $autoCancel: false });
    return record;
  } catch (error) {}
}

export async function getMovieSanses(id, today) {
  try {
    const records = await pb.collection("movie_sans").getFullList({
      filter: `movie= "${id}"`,
    });
    const filtered = filterDates(records, today);
    return filtered;
  } catch (error) {}
}

export function filterDates(records, today) {
  const dates = [];
  for (let i = 0; i < 5; i++) {
    if (records[i].day >= today.day) {
      dates.push(records[i]);
    }
  }
  return dates;
}

export async function createBooking(requestData) {
  try {
    const data = {
      user: requestData.userId,
      sans: requestData.sansId,
      seat_numbers: requestData.seats,
      ticket_string: requestData.ticketId,
    };
    const record = await pb.collection("booking").create(data);
    return record;
  } catch (error) {}
}

export function generateRandomString(index) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 10;
  let randomString = "";

  // Generate random characters for the random string
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  // Append a timestamp to ensure uniqueness
  const timestamp = new Date().getTime().toString();
  randomString += timestamp.slice(-5); // Append the last 5 digits of the timestamp
  randomString += index;
  return randomString;
}

// not completed
export async function getTicketInfo(requestData) {
  const times = ["4pm", "6pm", "8pm", "10pm"];
  const time =
    times[requestData.uniqueString[requestData.uniqueString.length - 1]];
  let day;
  let month;
  let sansRecord;
  let bookingRecord;
  let updatedSansRecord;

  try {
    bookingRecord = await pb
      .collection("booking")
      .getFirstListItem(
        `user="${requestData.userId}"  && ticket_string = "${requestData.uniqueString}"`,
        {}
      );

    try {
      sansRecord = await pb
        .collection("movie_sans")
        .getOne(`${bookingRecord.sans}`, {});

      day = sansRecord.day;
      month = sansRecord.month;
    } catch (error) {}

    try {
      const beforeTakenSeat = sansRecord.takenSeats;
      beforeTakenSeat[time] = beforeTakenSeat[time].concat(
        bookingRecord.seat_numbers
      );
      const data = {
        capacity: sansRecord.capacity - bookingRecord.seat_numbers.length,
        takenSeats: beforeTakenSeat,
      };
      updatedSansRecord = await pb
        .collection("movie_sans")
        .update(sansRecord.id, data);
    } catch (error) {}

    const response = {
      month: month,
      day: day,
      hour: time,
      seats: bookingRecord.seat_numbers,
    };

    return response;
  } catch (error) {}
}

export async function geuUserTicketHistory(requestData) {
  const times = ["4pm", "6pm", "8pm", "10pm"];
  const response = [];
  const resultList = await pb.collection("booking").getList(1, 50, {
    filter: `user="${requestData.userId}"`,
  });

  for (let i = 0; i < resultList.items.length; i++) {
    let sansResult = {
      time: "",
      seat: [],
      movie: "",
    };
    let result = {
      day: "",
      month: "",
      weekday: "",
      sans: [],
    };
    const item = resultList.items[i];
    sansResult.seat = item.seat_numbers;
    sansResult.time = times[item.ticket_string[item.ticket_string.length - 1]];
    try {
      const sansRecord = await pb
        .collection("movie_sans")
        .getOne(item.sans, {});
    } catch (error) {}
  }

  // const times = ["4pm", "6pm", "8pm", "10pm"];
  // const time =
  //   times[requestData.uniqueString[requestData.uniqueString.length - 1]];
  // let day;
  // let month;
  // let sansRecord;
  // let bookingRecord;
  // let updatedSansRecord;

  // try {
  //   bookingRecord = await pb
  //     .collection("booking")
  //     .getFirstListItem(
  //       `user="${requestData.userId}"  && ticket_string = "${requestData.uniqueString}"`,
  //       {}
  //     );

  //   try {
  //     sansRecord = await pb
  //       .collection("movie_sans")
  //       .getOne(`${bookingRecord.sans}`, {});

  //     day = sansRecord.day;
  //     month = sansRecord.month;
  //   } catch (error) {}

  //   try {
  //     const beforeTakenSeat = sansRecord.takenSeats;
  //     beforeTakenSeat[time] = beforeTakenSeat[time].concat(
  //       bookingRecord.seat_numbers
  //     );
  //     const data = {
  //       capacity: sansRecord.capacity - bookingRecord.seat_numbers.length,
  //       takenSeats: beforeTakenSeat,
  //     };
  //     updatedSansRecord = await pb
  //       .collection("movie_sans")
  //       .update(sansRecord.id, data);
  //   } catch (error) {}

  //   const response = {
  //     month: month,
  //     day: day,
  //     hour: time,
  //     seats: bookingRecord.seat_numbers,
  //   };

  //   return response;
  // } catch (error) {
  // }
}
