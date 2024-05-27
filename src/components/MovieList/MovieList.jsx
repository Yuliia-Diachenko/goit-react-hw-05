import {Link, useLocation} from 'react-router-dom';
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();
   console.log(movies);
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} >
            <Link to={`/movies/${movie.id}`} state={{ from: location }} className={css.link} >{movie.original_title}</Link>
        </li>
      ))}
    </ul>
  );
}