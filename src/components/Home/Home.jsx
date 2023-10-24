import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrending } from '../../services/api';

export const Home = props => {
  const [trendingMovies, setTrendingMovies] = useState([]);

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
              <Link to={`movies/${movie.id}`}>
                {movie.title == null ? movie.name : movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
