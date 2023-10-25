import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../../services/api';
import { Loader } from '../Loader/Loader';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [goit, setGoit] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const hendleSubmit = event => {
    event.preventDefault();
    setGoit(true);
  };

  const hendleChange = event => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0 && goit) {
      setIsLoading(true);
      getMovies(searchQuery, 1)
        .then(data => {
          setSearchResults(data.results);
          window.history.replaceState(null, '', `movies?query=${searchQuery}`);
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
            <Link to={`${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
