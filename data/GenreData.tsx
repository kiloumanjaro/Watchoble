// GenreData.tsx
import { ImageSourcePropType } from 'react-native';


export type GenreItem = {
  name: string;
  items: number;
  genre: string;
  movieId: number;
  image: ImageSourcePropType;
};

export const GenreData: GenreItem[] = [
  {
    name: 'Action',
    items: 30,
    genre: 'Action',
    movieId: 28,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Adventure',
    items: 25,
    genre: 'Adventure',
    movieId: 12,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Animation',
    items: 20,
    genre: 'Animation',
    movieId: 16,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Comedy',
    items: 18,
    genre: 'Comedy',
    movieId: 35,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Crime',
    items: 15,
    genre: 'Crime',
    movieId: 80,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Documentary',
    items: 15,
    genre: 'Documentary',
    movieId: 99,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Drama',
    items: 15,
    genre: 'Drama',
    movieId: 18,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Family',
    items: 15,
    genre: 'Family',
    movieId: 10751,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Fantasy',
    items: 15,
    genre: 'Fantasy',
    movieId: 14,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'History',
    items: 15,
    genre: 'History',
    movieId: 36,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Horror',
    items: 15,
    genre: 'Horror',
    movieId: 27,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Music',
    items: 15,
    genre: 'Music',
    movieId: 10402,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Mystery',
    items: 15,
    genre: 'Mystery',
    movieId: 9648,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Romance',
    items: 15,
    genre: 'Romance',
    movieId: 10749,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Thriller',
    items: 15,
    genre: 'Thriller',
    movieId: 53,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'War',
    items: 15,
    genre: 'War',
    movieId: 10752,
    image: require('~assets/images/default.png'),
  },
  {
    name: 'Western',
    items: 15,
    genre: 'Western',
    movieId: 37,
    image: require('~assets/images/default.png'),
  },
];
