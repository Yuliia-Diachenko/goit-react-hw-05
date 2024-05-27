import { useState, useEffect } from 'react';
import css from "./HomePage.module.css";
import MovieList from '../../components/MovieList/MovieList';
import { getMoviesTrending } from '../../movies-api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (!trendMovies) {
      setIsError(true);
      return;
    }
    async function getTrendMovies() {
      setLoading(true);
      setIsError(false);
      try {
        const data = await getMoviesTrending();
        setTrendMovies(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);        
      }
    }
    getTrendMovies();
  }, []);
 
  return (
    <div className={css.backgrnd}>
      <h1 className={css.title}>Trending Today</h1>
      {isError&&<ErrorMessage />}
      {loading && <Loader />}
      <MovieList movies={trendMovies}/> 
    </div>
  );
}

    

  