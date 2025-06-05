import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjgyYmVhZTExYWVlOTJjOTM1MGI4NTg0YzFhZGZiMSIsIm5iZiI6MTc0NTYzMzAwMC4wNTQwMDAxLCJzdWIiOiI2ODBjM2VlODVjZWZkMTlkMWM4NTdmOTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QJS5fE-k1M8kTf6iLB1JWyeuwJa-DVJrxZFjsRCGx1I'; // Replace with your actual API key
const BASE_URL1 = 'https://api.themoviedb.org/3/movie';
const BASE_URL2 = 'https://api.themoviedb.org/3';
const PARAMS = { language: 'en-US', page: '1' };
const HEADERS = {
  accept: 'application/json',
  Authorization: `Bearer ${API_KEY}`,
};

export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  
}

const DESIRED_MOVIE_COUNT = 10;

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL1}/popular`, {
      params: PARAMS,
      headers: HEADERS,
    });
    return (response.data.results as Movie[]).slice(0, DESIRED_MOVIE_COUNT);
  } catch (error: any) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL1}/top_rated`, {
      params: PARAMS,
      headers: HEADERS,
    });
    return  (response.data.results as Movie[]).slice(0, DESIRED_MOVIE_COUNT);
  } catch (error: any) {
    console.error('Error fetching top-rated movies:', error);
    throw error; 
  }
};

export const fetchGenreMovies = async (genreId: number) => {
  try {
    const response = await axios.get(`${BASE_URL2}/discover/movie`, {
      params: {
        include_adult: 'false',
        include_video: 'false',
        language: 'en-US',
        page: '1',
        sort_by: 'popularity.desc',
        with_genres: genreId.toString(),
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return (response.data.results as Movie[]).slice(0, DESIRED_MOVIE_COUNT);
  } catch (error: any) {
    console.error('Error fetching movies for that genre', error);
    throw error;
  }
};

export const fetchSingleMovie = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL1}/${movieId}`, {
      params: PARAMS,
      headers: HEADERS,
    });
    return response.data as Movie;
  } catch (error: any) {
    console.error('Error fetching single movie:', error);
    throw error;
  }
};