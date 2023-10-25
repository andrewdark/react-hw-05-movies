import { useParams } from 'react-router-dom';
import { getReviews } from '../../services/api';
import { useState, useEffect } from 'react';

const Reviews = () => {
  const { movieId } = useParams();
  const [theReview, setTheReview] = useState([]);

  useEffect(() => {
    getReviews(movieId)
      .then(data => {
        setTheReview(data.results);
      })
      .catch(err => {
        console.log(err);
      });
  }, [movieId]);

  return (
    <div>
      {theReview.length > 0 && (
        <ul>
          {theReview.map(el => {
            return (
              <li key={el.id}>
                {el.author}
                <br />
                <p>{el.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
