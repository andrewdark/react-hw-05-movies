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

  useEffect(() => {
    if (searchQuery && goit) {
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
  }, [searchQuery, goit]);
  return (
    <div>
      <h1>Search Movies</h1>
      <input
        type="text"
        placeholder="type somethin for searching..."
        required
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button
        onClick={() => {
          if (searchQuery && searchQuery.length > 0) {
            setGoit(true);
          }
        }}
      >
        Search
      </button>
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
