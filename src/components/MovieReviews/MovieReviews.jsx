import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../movies-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

import css from "./MovieReviews.module.css";
  
export default function MovieReviews(){
    const [reviewsList, setReviewsList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { movieId } = useParams();
    useEffect(() => {
      const getMovieReviews = async (movieId) => {
        try {
          setLoading(true);
          setIsError(false);
          const data = await fetchMovieReviews(movieId);
          setReviewsList(data.results);
        } catch (error) {
          setIsError(true);
        } finally {
          setLoading(false);
        }
      };
      getMovieReviews(movieId);
    }, [movieId]);
    return (
      <>
        <ul>       
           {reviewsList.map(({ author, content, id }) => (
            <li key={id} className={css.item}>             
              <h3 className={css.name}>                
                {author}
              </h3>
              <p className={css.content}>{content}</p>
            </li>
          ))}
          </ul>
          {reviewsList.length === 0 && <p>We do not have any reviews for this movie yet</p>}
          {isError && <ErrorMessage />}
          {loading && <Loader />}

      </>
    );
}