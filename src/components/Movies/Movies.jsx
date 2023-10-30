import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getMovies } from '../../services/api';
import { Loader } from '../Loader/Loader';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [goit, setGoit] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const hendleSubmit = event => {
    event.preventDefault();
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    }
    setGoit(true);
  };

  const hendleChange = event => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  useEffect(() => {
    if (searchParams.get('query')) {
      setIsLoading(true);
      getMovies(searchParams.get('query'), 1)
        .then(data => {
          setSearchResults(data.results);
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setGoit(false);
          setIsLoading(false);
          setSearchQuery('');
        });
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0 && goit) {
      setIsLoading(true);
      getMovies(searchQuery, 1)
        .then(data => {
          setSearchResults(data.results);
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setGoit(false);
          setIsLoading(false);
          setSearchQuery('');
        });
    }
    console.log('SEARCH BTN');
  }, [goit, searchQuery]);

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={hendleSubmit} method="GET">
        <input
          type="text"
          placeholder="type somethin for searching..."
          required
          onChange={hendleChange}
          value={searchQuery}
        />
        <button type="submit">Search</button>
      </form>

      {error != null && <p>{error}</p>}
      {isLoading && <Loader />}
      <ul>
        {searchResults.map(movie => (
          <li key={movie.id}>
            <Link to={`${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
