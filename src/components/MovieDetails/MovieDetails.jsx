import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { getDetails } from '../../services/api';
import { useState, useEffect } from 'react';
import goback from '../../img/goback.png';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigante = useNavigate();

  useEffect(() => {
    getDetails(movieId)
      .then(data => {
        setMovie(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [movieId]);
  return (
    <main>
      <button className={css.goback} onClick={() => navigante(-1)}>
        <img src={goback} alt="go back" />
      </button>
      {movie && (
        <div>
          <img
            src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
            alt="poster_path"
          />
          <div>
            <h2>{movie.title}</h2>
            <p>User Score: {Number.parseFloat(movie.vote_average) * 10}%</p>
            <h2>Overwiev</h2>
            <p>{movie.overview}</p>
            <h2>Genres</h2>
            <p>
              {movie.genres.map(el => {
                return <span key={el.id}>{el.name}</span>;
              })}
            </p>
          </div>
        </div>
      )}

      <div>
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link to="cast">Read about cast</Link>
          </li>
          <li>
            <Link to="reviews">Read about reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </main>
  );
};

export default MovieDetails;
