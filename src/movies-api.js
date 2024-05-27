import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = 'b5278d9cb671417837e9caec82d9791a';

export const getMoviesTrending = async () => {
  const response = await axios.get(
    `trending/movie/day?api_key=${API_KEY}&language=en-US`
  );

  return response.data.results;
};
export const fetchMovieDetails = async movieId => {
  const response = await axios.get(
    `movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  
   return response.data;
};

export const getMovieSearch = async query => {
  const response = await axios.get(
    `search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );

  return response.data.results;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );

  return response.data;
};
export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );

  return response.data;
};