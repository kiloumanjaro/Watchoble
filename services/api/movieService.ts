import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL1 = "https://api.themoviedb.org/3/movie";
const BASE_URL2 = "https://api.themoviedb.org/3";
const PARAMS = { language: "en-US", page: "1" };
const HEADERS = {
  accept: "application/json",
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
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL1}/top_rated`, {
      params: PARAMS,
      headers: HEADERS,
    });
    return (response.data.results as Movie[]).slice(0, DESIRED_MOVIE_COUNT);
  } catch (error: any) {
    console.error("Error fetching top-rated movies:", error);
    throw error;
  }
};

export const fetchGenreMovies = async (genreId: number) => {
  try {
    const response = await axios.get(`${BASE_URL2}/discover/movie`, {
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: "1",
        sort_by: "popularity.desc",
        with_genres: genreId.toString(),
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return (response.data.results as Movie[]).slice(0, DESIRED_MOVIE_COUNT);
  } catch (error: any) {
    console.error("Error fetching movies for that genre", error);
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
    console.error("Error fetching single movie:", error);
    throw error;
  }
};

export const searchMovies = async (query: string) => {
  try {
    if (!query.trim()) {
      return [];
    }

    const response = await axios.get(`${BASE_URL2}/search/movie`, {
      params: {
        query: query.trim(),
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
      headers: HEADERS,
    });

    return response.data.results as Movie[];
  } catch (error: any) {
    console.error("Error searching movies:", error);
    throw error;
  }
};
