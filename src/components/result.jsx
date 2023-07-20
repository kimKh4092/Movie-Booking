import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authservice";
import { Link, useParams } from "react-router-dom";
import { getTicketInfo } from "../services/movieservice";
import { getCurrentUserID } from "./../services/authservice";
import { months } from "./../utils/dateData";

const Result = () => {
  //for test

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [hour, setHour] = useState("");
  const [tickets, setTickets] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    const request = {
      uniqueString: params.id,
      userId: getCurrentUserID(),
    };
    try {
      const ticketInfo = await getTicketInfo(request);
      setDay(ticketInfo.day.toString());
      setMonth(ticketInfo.month);
      setHour(ticketInfo.hour);
      setTickets(ticketInfo.seats);
    } catch (error) {}
  };

  const goBack = () => {
    window.location = "/explore";
  };

  return (
    <>
      <nav>
        <li className="nav">
          <ul className="navItem1">
            <Link className="navItem1" to="/explore">
              {" "}
              Phantom Screen
            </Link>
          </ul>

          {!getCurrentUser() ? (
            <ul className="navItem2">
              <Link to="/signup" className="joinUs">
                Join us
              </Link>
            </ul>
          ) : (
            <Link to="/profile" className="joinUs">
              <p className="navItem2">{getCurrentUser()}</p>
            </Link>
          )}
        </li>
      </nav>

      <div className="success">
        <h2 className="successTitle">
          Your Purchase Was{""}
          <span style={{ color: "#902923" }}> Successfull</span>
        </h2>
        <h1 className="ticketInfo">Ticket Information</h1>
        <h2 className="successTitle">
          {day} {month}
          <span style={{ color: "#902923" }}> {hour} </span>
        </h2>
        {tickets.map((ticket) => (
          <div className="ticketBox" key={ticket}>
            <p className="ticketText">Seat Number {ticket}</p>
            <p className="ticketPrice">50$</p>
          </div>
        ))}
        <button onClick={goBack} className="purchase">
          Back to main page
        </button>
      </div>
    </>
  );
};

export default Result;
