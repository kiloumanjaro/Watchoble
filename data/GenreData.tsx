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
    image: require('../assets/images/Genre_imgs/Action_card.jpg'),
  },
  {
    name: 'Adventure',
    items: 25,
    genre: 'Adventure',
    movieId: 12,
    image: require('../assets/images/Genre_imgs/Adventure_card.jpg'),
  },
  {
    name: 'Animation',
    items: 20,
    genre: 'Animation',
    movieId: 16,
    image: require('../assets/images/Genre_imgs/Animation_card.jpg'),
  },
  {
    name: 'Comedy',
    items: 18,
    genre: 'Comedy',
    movieId: 35,
    image: require('../assets/images/Genre_imgs/Comedy_card.jpg'),
  },
  {
    name: 'Crime',
    items: 15,
    genre: 'Crime',
    movieId: 80,
    image: require('../assets/images/Genre_imgs/Crime_card.jpeg'),
  },
  {
    name: 'Documentary',
    items: 15,
    genre: 'Documentary',
    movieId: 99,
    image: require('../assets/images/Genre_imgs/Documentary_card.jpg'),
  },
  {
    name: 'Drama',
    items: 15,
    genre: 'Drama',
    movieId: 18,
    image: require('../assets/images/Genre_imgs/Drama_card.jpg'),
  },
  {
    name: 'Family',
    items: 15,
    genre: 'Family',
    movieId: 10751,
    image: require('../assets/images/Genre_imgs/Family_card.jpg'),
  },
  {
    name: 'Fantasy',
    items: 15,
    genre: 'Fantasy',
    movieId: 14,
    image: require('../assets/images/Genre_imgs/Fantasy_card.jpg'),
  },
  {
    name: 'History',
    items: 15,
    genre: 'History',
    movieId: 36,
    image: require('../assets/images/Genre_imgs/History.jpg'),
  },
  {
    name: 'Horror',
    items: 15,
    genre: 'Horror',
    movieId: 27,
    image: require('../assets/images/Genre_imgs/Horror.jpg'),
  },
  {
    name: 'Music',
    items: 15,
    genre: 'Music',
    movieId: 10402,
    image: require('../assets/images/Genre_imgs/Music.jpg'),
  },
  {
    name: 'Mystery',
    items: 15,
    genre: 'Mystery',
    movieId: 9648,
    image: require('../assets/images/Genre_imgs/Mystery.jpg'),
  },
  {
    name: 'Romance',
    items: 15,
    genre: 'Romance',
    movieId: 10749,
    image: require('../assets/images/Genre_imgs/Romance.jpg'),
  },
  {
    name: 'Thriller',
    items: 15,
    genre: 'Thriller',
    movieId: 53,
    image: require('../assets/images/Genre_imgs/Thriller.jpg'),
  },
  {
    name: 'War',
    items: 15,
    genre: 'War',
    movieId: 10752,
    image: require('../assets/images/Genre_imgs/War.jpg'),
  },
  {
    name: 'Western',
    items: 15,
    genre: 'Western',
    movieId: 37,
    image: require('../assets/images/Genre_imgs/Western.jpg'),
  },
];
