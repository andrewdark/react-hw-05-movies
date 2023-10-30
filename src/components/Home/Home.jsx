import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTrending } from '../../services/api';

export const Home = props => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrending()
      .then(data => {
        setTrendingMovies(data.results);
      })
      .catch(error => {
        console.error('Fetching exception: ', error);
      });
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {trendingMovies.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`movies/${movie.id}`} state={{ from: location }}>
                {movie.title == null ? movie.name : movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
