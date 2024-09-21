import css from './NavLink.module.css';
import { FaSearch } from "react-icons/fa";

export default function NavLink({onSubmit}) {
    return(
        <form onSubmit={onSubmit} className={css.form}>
        <input
          type="text"
          name="movieName"
          placeholder="Enter movie name"
          autoComplete="off"
          autoFocus
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          required
          className={css.input}
        />
        <button type="submit" className={css.btnSearch}>
        <FaSearch /> Search
        </button>
      </form>
    )
  
}