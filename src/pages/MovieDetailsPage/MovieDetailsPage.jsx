import { useEffect, useState } from 'react';
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import {fetchMovieDetails} from '../../movies-api';
import css from './MovieDetailsPage.module.css';
import { SlActionUndo } from "react-icons/sl";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

  export default function MovieDetailsPage() {
    const [movieDetails, setMovieDetails] = useState({});
    const [isError, setIsError] = useState(false);
    const location = useLocation();
    const {movieId} = useParams();

    useEffect(() => {
      const getMovieDetails = async () => {
        try {
          const data = await fetchMovieDetails(movieId);
          setMovieDetails(data);
        } catch (error) {
          return setIsError(true);
        }
      };
      getMovieDetails();
    }, [movieId]);

    const {original_title, overview, genres, poster_path, vote_average } =
      movieDetails;
    const scoreToFixed = Number(vote_average).toFixed(2);
  
    return (
          <div className={css.container} >          
          <Link to={location.state?.from ?? "/"} className={css.goBackLink}>
            <SlActionUndo />Go back
          </Link>
          {isError&&<ErrorMessage />}
          <div className={css.detailsPage}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w300${poster_path}`
                  : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`
              }
              loading="lazy"
              alt="Movie poster"
              className={css.img}
            />
            <div className={css.about}>
              <h1>{original_title}</h1>
              <p>User score: {scoreToFixed}</p>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h2>Genres</h2>
              <ul className={css.genreList}>
                {genres &&
                  genres.length &&
                  genres.map(({ id, name }) => <li key={id}>{name}</li>)}
              </ul>
            </div></div>
          <div className={css.additional}>
            <h3 className={css.addInfoTitle}>Additional information</h3>
            <ul className={css.infoList}>
              <li className={css.infoItem}>
                <Link
                  to="cast"
                  state={{ ...location.state }}
                  className={css.infoLink}
                >
                  Cast
                </Link>
              </li>
              <li className={css.infoItem}>
                {" "}
                <Link
                  to="reviews"
                  state={{ ...location.state }}
                  className={css.infoLink}
                >
                  Reviews
                </Link>
              </li>
            </ul>
            <hr />
          </div>
            <Outlet />
        </div>
      
    );
  }