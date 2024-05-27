import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../movies-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import css from "./MovieReviews.module.css";
  
export default function MovieReviews(){
    const [reviewsList, setReviewsList] = useState([]);
    const [isError, setIsError] = useState(false);
    const { movieId } = useParams();
    useEffect(() => {
      const getMovieReviews = async (movieId) => {
        try {
          const data = await fetchMovieReviews(movieId);
          setReviewsList(data.results);
        } catch (error) {
          setIsError(true);
        }
      };
      getMovieReviews(movieId);
    }, [movieId]);
    return(
        <ul>
        {reviewsList.length > 0 ? (
          reviewsList.map(({ author, content, id }) => (
            <li key={id} className={css.item}>
             { isError&&<ErrorMessage />}
              <h3 className={css.name}>
                
                {author}
              </h3>
              <p className={css.content}>{content}</p>
            </li>
          ))
        ) : (
          <p>We do not have any reviews for this movie yet</p>
        )}
      </ul>
    );
}