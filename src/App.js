import './App.css';
import Intro from './components/intro'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Explore from './components/home/explorePage';
import 'font-awesome/css/font-awesome.css'
import AllMovies from './components/allMovies';
import MoviePage from './components/moviePage/moviePage';
import NotFound from './components/notFound';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/allMovies' element={<AllMovies />} />

        {/* for test */}
        <Route path='/moviePage' element={<MoviePage />} />

        {/* pass props for each movie */}
        {/* <Route path='/allmovies/:id' element={<MoviePage />}/> */}

        <Route path='*' element={<Navigate to='/not-found' />} />
        <Route path='/not-found' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
