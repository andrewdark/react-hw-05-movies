import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import {Home} from "./Home/Home";

const APP_PATH = '/goit-react-hw-05-movies';

export const App = () => {
  return (
    <div >
      <nav style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}>
        <Link to={`${APP_PATH}/`} style={{ marginRight: 24 }}>
          Home
        </Link>
        <Link to={`${APP_PATH}/movies`} style={{ marginRight: 24 }}>
          Movies
        </Link>
        <Link to={`${APP_PATH}/movies/1`} style={{ marginRight: 24 }}>
          MovieDetails
        </Link>
      </nav>
      <Routes>
        <Route path={`${APP_PATH}/`} element={<Home />} />
        <Route path={`${APP_PATH}/movies`} element={<Home />} />
        <Route path={`${APP_PATH}/movies/:movieId`} element={<Home />}>
          {/*<Route path="cast" element={<Cast />} />*/}
          {/*<Route path="reviews" element={<Reviews />} />*/}
        </Route>
      </Routes>
    </div>
  );
};
