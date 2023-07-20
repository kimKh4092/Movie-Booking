import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "font-awesome/css/font-awesome.css";
import "./App.css";
import AllMovies from "./components/allMovies";
import MoviePage from "./components/moviePage/moviePage";
import NotFound from "./components/notFound";
import MainLogin from "./components/forms/mainLogin";
import MainSignUp from "./components/forms/mainSignUp";
import Explore from "./components/home/explorePage";
import Intro from "./components/intro";
import Result from "./components/result";
import Profile from "./components/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/allMovies" element={<AllMovies />} />
        <Route path="/login" element={<MainLogin />} />
        <Route path="/signup" element={<MainSignUp />} />
        <Route path="/allMovies/:id" element={<MoviePage />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
