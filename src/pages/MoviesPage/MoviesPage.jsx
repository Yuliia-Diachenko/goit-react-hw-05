import { useSearchParams, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieSearch } from "../../movies-api";
import NavLink from "../../components/NavLink/NavLink";
import Loader from "../../components/Loader/Loader";
import css from "./MoviesPage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";



export default function MoviesPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get("movieName") ?? "";
  const [moviesList, setMoviesList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    if (movieName === "") {      
      return setIsError(true);
    }
    setMoviesList([]);
    setLoading(true);
    const getMovieByKeyword = async (movieName) => {
      try {
        await getMovieSearch(movieName).then((data) => {
          if (!data.length) {
            setLoading(false);
            setIsError(true);
            return;
          }
          setIsError(false);
          setMoviesList(data);
        });
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovieByKeyword(movieName);
  }, [movieName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchForm = e.currentTarget;
    setSearchParams({ movieName: searchForm.elements.movieName.value });
    searchForm.reset();
  };

  return (
    <main className="container">
      <div className={css.moviesPage}>
        <NavLink onSubmit={handleSubmit} />        
        <ul className={css.movieList}>
          {moviesList.map((movie) => {
            return (
              <li key={movie.id}>
                <Link
                  to={`/movies/${movie.id}`}
                  state={{ from: location }}
                  className={css.link}>
                  {movie.original_title || movie.name}
                </Link>
              </li>
            );
          })}
          {isError && <ErrorMessage />}
          {loading && <Loader />}
        </ul>
      </div>
    </main>
  );
}