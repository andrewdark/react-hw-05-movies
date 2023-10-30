import React, { Suspense } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Home } from './Home/Home';
import css from './App.module.css';
import { Loader } from './Loader/Loader';
const Movies = React.lazy(() => import('./Movies/Movies'));
const MovieDetails = React.lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = React.lazy(() => import('./Cast/Cast'));
const Reviews = React.lazy(() => import('./Reviews/Reviews'));

const APP_PATH = '/goit-react-hw-05-movies';
export const App = () => {
  return (
    <div className={css.container}>
      <nav className={css.navLink}>
        <NavLink
          to={`${APP_PATH}/`}
          className={({ isActive }) => (isActive ? css.active : css.nonActive)}
        >
          Home
        </NavLink>
        <NavLink
          to={`${APP_PATH}/movies`}
          className={({ isActive }) => (isActive ? css.active : css.nonActive)}
        >
          Movies
        </NavLink>
      </nav>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={`${APP_PATH}/`} element={<Home />} />
          <Route path={`${APP_PATH}/movies`} element={<Movies />} />
          <Route
            path={`${APP_PATH}/movies/:movieId`}
            element={<MovieDetails APP_PATH={APP_PATH} />}
          >
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path={`*`} element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
};
