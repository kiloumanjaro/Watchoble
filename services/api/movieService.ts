import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjgyYmVhZTExYWVlOTJjOTM1MGI4NTg0YzFhZGZiMSIsIm5iZiI6MTc0NTYzMzAwMC4wNTQwMDAxLCJzdWIiOiI2ODBjM2VlODVjZWZkMTlkMWM4NTdmOTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QJS5fE-k1M8kTf6iLB1JWyeuwJa-DVJrxZFjsRCGx1I'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3/movie';
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

const DESIRED_MOVIE_COUNT = 2;

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/popular`, {
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
    const response = await axios.get(`${BASE_URL}/top_rated`, {
      params: PARAMS,
      headers: HEADERS,
    });
    return  (response.data.results as Movie[]).slice(0, DESIRED_MOVIE_COUNT);
  } catch (error: any) {
    console.error('Error fetching top-rated movies:', error);
    throw error; 
  }
};