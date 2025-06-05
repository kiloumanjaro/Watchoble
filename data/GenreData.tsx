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
    image: require('../assets/images/FilmGenre_imgs/action.png'),
  },
  {
    name: 'Adventure',
    items: 25,
    genre: 'Adventure',
    movieId: 12,
    image: require('../assets/images/FilmGenre_imgs/adventure_card.png'),
  },
  {
    name: 'Animation',
    items: 20,
    genre: 'Animation',
    movieId: 16,
    image: require('../assets/images/FilmGenre_imgs/animation.png'),
  },
  {
    name: 'Comedy',
    items: 18,
    genre: 'Comedy',
    movieId: 35,
    image: require('../assets/images/FilmGenre_imgs/comedy.png'),
  },
  {
    name: 'Crime',
    items: 15,
    genre: 'Crime',
    movieId: 80,
    image: require('../assets/images/FilmGenre_imgs/crime.png'),
  },
  {
    name: 'Documentary',
    items: 15,
    genre: 'Documentary',
    movieId: 99,
    image: require('../assets/images/FilmGenre_imgs/documentary.png'),
  },
  {
    name: 'Drama',
    items: 15,
    genre: 'Drama',
    movieId: 18,
    image: require('../assets/images/FilmGenre_imgs/drama.png'),
  },
  {
    name: 'Family',
    items: 15,
    genre: 'Family',
    movieId: 10751,
    image: require('../assets/images/FilmGenre_imgs/family.png'),
  },
  {
    name: 'Fantasy',
    items: 15,
    genre: 'Fantasy',
    movieId: 14,
    image: require('../assets/images/FilmGenre_imgs/fantasy.png'),
  },
  {
    name: 'History',
    items: 15,
    genre: 'History',
    movieId: 36,
    image: require('../assets/images/FilmGenre_imgs/history.png'),
  },
  {
    name: 'Horror',
    items: 15,
    genre: 'Horror',
    movieId: 27,
    image: require('../assets/images/FilmGenre_imgs/horror.png'),
  },
  {
    name: 'Music',
    items: 15,
    genre: 'Music',
    movieId: 10402,
    image: require('../assets/images/FilmGenre_imgs/music.png'),
  },
  {
    name: 'Mystery',
    items: 15,
    genre: 'Mystery',
    movieId: 9648,
    image: require('../assets/images/FilmGenre_imgs/mystery.png'),
  },
  {
    name: 'Romance',
    items: 15,
    genre: 'Romance',
    movieId: 10749,
    image: require('../assets/images/FilmGenre_imgs/romance.png'),
  },
  {
    name: 'Thriller',
    items: 15,
    genre: 'Thriller',
    movieId: 53,
    image: require('../assets/images/FilmGenre_imgs/thriller.png'),
  },
  {
    name: 'War',
    items: 15,
    genre: 'War',
    movieId: 10752,
    image: require('../assets/images/FilmGenre_imgs/war.png'),
  },
  {
    name: 'Western',
    items: 15,
    genre: 'Western',
    movieId: 37,
    image: require('../assets/images/FilmGenre_imgs/western.png'),
  },
];
