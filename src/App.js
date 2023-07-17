import './App.css';
import Intro from './components/intro'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Explore from './components/home/explorePage';
import 'font-awesome/css/font-awesome.css'
import AllMovies from './components/allMovies';
import MoviePage from './components/moviePage/moviePage';
import NotFound from './components/notFound';
import MainLogin from './components/forms/mainLogin';
import MainSignUp from './components/forms/mainSignUp';
import { createContext, useState } from 'react';

export const UserContext = createContext();

function App() {

  const [user, setUser] = useState();

  function setCurrentUser(user) {
    console.log('set')
    setUser(user);
    console.log(user)
  }

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserContext.Provider value={user}>
          <Intro setCurrentUser={setCurrentUser} />
        </UserContext.Provider>} />

        <Route path='/explore' element={<Explore />} />

        <Route path='/allMovies' element={<AllMovies />} />

        <Route path='/login' element={<UserContext.Provider>
          <MainLogin
            setCurrentUser={setCurrentUser} />
        </UserContext.Provider>

        } />
        <Route path='/signup' element={<MainSignUp />} />

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
