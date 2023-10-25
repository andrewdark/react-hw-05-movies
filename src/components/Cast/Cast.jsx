import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCast } from '../../services/api';
import noimg from '../../img/No_img.jpg';

const Cast = () => {
  const { movieId } = useParams();
  const [theCast, setTheCast] = useState([]);

  useEffect(() => {
    getCast(movieId)
      .then(data => {
        setTheCast(data.cast);
      })
      .catch(err => {
        console.log(err);
      });
  }, [movieId]);

  return (
    <div>
      <ul>
        {theCast.map(el => {
          return (
            <li key={el.id}>
              <img
                src={
                  el.profile_path !== null
                    ? 'https://image.tmdb.org/t/p/w200/' + el.profile_path
                    : noimg
                }
                alt=""
              />
              {el.name} AS {el.character}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cast;
