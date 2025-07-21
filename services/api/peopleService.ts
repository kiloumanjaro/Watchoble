import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY!;
const BASE_URL = "https://api.themoviedb.org/3/trending/person/day";
const PARAMS = { language: "en-US", page: "1" };
const HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

export interface Person {
  id: number;
  name: string;
  profile_path?: string;
  known_for_department?: string;
}

const DESIRED_PERSON_COUNT = 10; // You can change this as you want

export const fetchTrendingPeople = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: PARAMS,
      headers: HEADERS,
    });
    const people = response.data.results as Person[];
    return people.slice(0, DESIRED_PERSON_COUNT);
  } catch (error: any) {
    console.error("Error fetching trending people:", error);
    throw error;
  }
};
